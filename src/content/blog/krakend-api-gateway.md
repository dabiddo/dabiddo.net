---
##layout: ../layouts/Blogpost.astro
title: 'Testing Krakend for API Gateway'
description: "Taking Krakend for a ride, as an API Gateway"
image:
    url: 'https://media.publit.io/file/krakend.png' 
    alt: 'krakend'
pubDate: 2023-06-17
jpn: '#'
author: 'Dabiddo'
tags: ["krakend","docker","microservices"]
---
# Testing Krakend for API Gateway

As I've expressed in a [previous post](/blog/laravel-nest-share-auth), we are migrating a laravel monolith to nestjs microservices, as such we need an API gateway that can handle both the legacy API and the new API.

While researching, I found this app called [Krakend](https://www.krakend.io/), I know there are others out there who use Tyk.io but what got me interested in krakend is that it can be run in docker, and it only needs a json file for configuration.

I leave this here, because while using the playground it came with really heavy services for monitoring, but because I'm just learning it, I removed most stuff and just kept krakend on my docker-compose file.

### Pre-requisites

For this example I'm using my previous example on [laravel / nestjs shared auth](https://github.com/dabiddo/laravel-nestjs-auth/tree/krakend-example), so you can just clone it, and head to the `krakend-example` branch to check the files.

## What changed?

In order to accomodate krakend in my project I had to modify my docker-compose file

```yaml
version: '3'

services:
  mysql:
    image: mysql:5.7
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_DATABASE=laraveldb
    volumes:
      - db-data:/var/lib/mysql:cached

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:cached
      - ../:/app:cached
    depends_on:
      - workspace #must be the same name of the laravel container used above

  krakend_ce:
    # The :watch image restarts the service automatically when the configuration files change.
    # Do not use this image in production, it's meant to speed up your testing and development.
    image: devopsfaith/krakend:watch
    volumes:
      - ./krakend:/etc/krakend
    ports:
      - "1234:1234"
      - "8080:8080"
      - "8090:8090"
    command: ["run", "-d", "-c", "/etc/krakend/krakend.json"]

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  db-data:

```

I also had to set a `HOST` enviroment in my Dockerfile in order for nestJs to be accesible in the docker network.

`ENV HOST 0.0.0.0`

## Controller Endpoints

Before heading to create the Krakend config, I added an API endpoint to my controllers in Laravel & NestJs

**For example reasons, I hardcoded the api/v1**

```php
//routes/api.php
Route::get('v1/cats',function(){
    return response(['message'=>'v1 cats']);
});
```

```ts
//app.controller.ts
@Get('api/v2/cats')
  getCats(): any {
    return { message: 'v2 Cats' };
  }
```

## Adding Krakend Config

After adding Krakend in my docker-compose, I had to make a folder for the configuration as you see from the mapped volumes `.devocontainer/krakend/` inside it a `krakend.json` file.

This is my basic krakend json config file

```json
{
    "$schema": "https://www.krakend.io/schema/v3.json",
    "version": 3,
    "name": "KrakenD - API Gateway",
    "timeout": "3000ms",
    "cache_ttl": "300s",
    "output_encoding": "json",
    "debug_endpoint": true,
    "echo_endpoint": true,
    "endpoints": [
    {
      "endpoint": "/v1/cats",
      "method": "GET",
      "output_encoding": "json",
      "backend": [
        {
          "url_pattern": "/api/v1/cats",
          "encoding": "json",
          "method": "GET",
          "extra_config": {
            "github.com/devopsfaith/krakend-cors": {
              "allow_origins": ["*"],
              "allow_methods": ["GET"],
              "allow_headers": ["Content-Type"]
            }
          },
          "host": [
            "http://nginx"
          ],
          "disable_host_sanitize": true
        }
      ]
    },
    {
      "endpoint": "/v2/cats",
      "method": "GET",
      "output_encoding": "json",
      "backend": [
        {
          "url_pattern": "/api/v2/cats",
          "encoding": "json",
          "method": "GET",
          "extra_config": {
            "github.com/devopsfaith/krakend-cors": {
              "allow_origins": ["*"],
              "allow_methods": ["GET"],
              "allow_headers": ["Content-Type"]
            }
          },
          "host": [
            "http://workspace:3000"
          ],
          "disable_host_sanitize": true
        }
      ]
    }
  ]
}
  
```

**Notes:**

Because Docker sets alias on the containers, in order to call them, I had to reference them by their alias.

**Using artisan serve**

If by any chance, you are using `php artisan serve` command from docker, you need to pass the host and port parameters in order for them to be exposed

`php artisan serve --host=0.0.0.0 --port=8000`

In the krakend.json file, remember to change the `host` to the name of the container hosting the laravel app, in my example it would be `http://workspace:8000`

# Test Time

In order to test that it works, you can head to `http://localhost:8080/v1/cats`

this answer will come from laravel, if you change to `v2` the answer will come from NestJs.