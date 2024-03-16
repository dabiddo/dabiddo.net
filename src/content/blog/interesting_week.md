---
##layout: ../layouts/Blogpost.astro
title: 'Interesting week'
description: "Enjoyed the week with releases for different products"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2024-03-16
jpn: '#'
author: 'Dabiddo'
tags: ["laravel", "astro"]
--- 

Hello to all

This was an interesting week, with the release of Laravel 11 and Astro 4, I've been glued to twitter reading all the news and bookmarking all new blog posts and videos the community is sharing.

with that in mind, I've been playing with Laravel 11 lately just to test the waters, but what I liked the most was playing with the new FrankenPHP in a devContainer, that thing is crazy fast, and implementing it in docker was easy, no workarounds except that the docker image seems to be blocked and can´t make the Dockerfile install Node, so I had to sping a `docker-compose` and setup a separate NodeJs service that I can piggyback into for compiling assets.

This is what I'm doing to play with a fresh Laravel 11 in my laptop

### Create a fresh Laravel 11 project
For this, we are going to use a `composer` docker to run the Laravel create-project command

```bash
sudo docker run --rm -v $(pwd):/app composer create-project --prefer-dist laravel/laravel <mylaravelproject>
```

**Note:** if you want to install an older version of Laravel, you can do so by adding the `^<version>`after **laravel/laravel**
example: `.. laravel/laravel:^10 ..` <-- This will install the latest version of Laravel 10 as of this writing I get `10.3.3`

Once the Laravel project is created and composer installed the packages, you will need to change the owner of the project folder

```bash
sudo chown -R myuser:user <mylaravelproject>
```

Once that is done, you can `cd /` into the project folder and create the `.devcontainer/` folder and blank `devcontainer.json` & `docker-compose.yml` files.

This is where it gets interesting, because I usually created a `Dockerfile` for PHP and install all dependecies, but now is not needed for FrankenPHP, this are my files to make it work.

**docker-compose.yml**
```yml
version: "3.8"

services:
  php:
    image: dunglas/frankenphp
    # uncomment the following line if you want to use a custom Dockerfile
    #build: .
    # uncomment the following line if you want to run this in a production environment
    # restart: always
    ports:
      - "80:80" # HTTP
      - "443:443" # HTTPS
      - "443:443/udp" # HTTP/3
    volumes:
      - ../:/app
      - caddy_data:/data
      - caddy_config:/config

```

If you checkout the official FrankenPHP documentation, is the exact same code, I just added my local volume and thats it.

**devcontainer.json**
```json
{
    "name": "laraleven",
    "service": "php",
    "workspaceFolder": "/app",
    "dockerComposeFile": [
        "docker-compose.yml"
    ],
    "customizations": {
        "vscode": {
            "extensions": [
                "ms-azuretools.vscode-docker",
                "DEVSENSE.phptools-vscode",
                "onecentlin.laravel-blade",
                "shufo.vscode-blade-formatter",
                "open-southeners.laravel-pint",
                "amiralizadeh9480.laravel-extra-intellisense",
                "codingyu.laravel-goto-view",
                "absszero.vscode-laravel-goto",
                "formulahendry.auto-rename-tag",
                "vincaslt.highlight-matching-tag",
                "bradlc.vscode-tailwindcss",
                "ryannaddy.laravel-artisan",
                "onecentlin.laravel5-snippets",
                "onecentlin.laravel-extension-pack"
            ]
        }
    }
}

```

for this file it just calls the `docker-compose.yml` file and loads the VSCode extensions to make development in Laravel easier.
you can just change the `name` at the beggining to your project name.

And this is how I'm playing with Laravel without installing anything in my computer aside from Docker and VSCode.
I also have some docker one liners for creating `Nuxt` , `NestJs` and `refine.dev` projects, but I'll leave those for another post.

Beacuse I've been playing with Laravel, I haven´t had the time to catch up with `astro` but I will do so in the upcoming days, starting by upgrading my blog to the latest version.

Thats if for this week, hope you enjoy the post.