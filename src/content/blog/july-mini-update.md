---
##layout: ../layouts/Blogpost.astro
title: 'July Mini Update'
description: "mini update of everything I've been learning.."
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2023-07-29
jpn: '#'
author: 'Dabiddo'
tags: ["pnpm","microservices","nestjs", "apisix"]
---

### Bit of an update
July hasn't been my month, my internet service got cut off 2 times because of some glitch in my providers system that did not update my payment information, and after long hours on the phone, and 2 different reprentatives every time it got cut off, I finally sorted everything out, but because the company is short on personnel, I had to wait between 4 to 5 days for a technician to come to my house and check connection before it could get restored... thats why I couln't write anything this month.
Also the second time the internet got restored, the next day we suffer a power failure, and we got power back on until late at night...
In the meantime I had to go to my brothers house to keep working, thanks Bro!

### Remaking Microservices with PNPM and NestJs
As stated before, at work we are migrating a Laravel Monlith to Nestjs Microservices, we do this with the help of PNPM workspaces, we found this [really cool guide](https://www.tomray.dev/nestjs-nextjs-trpc) that shows how to do NestJs in strict mode, which we are following and its really cool, its forcing us to do type checking for everything, and its forcing to try and make the code smaller but with correct validations where needed.

### Finally made a compatiple JWT Token bewteen Laravel & Nestjs
The microservice that handles the auth, I finally was able to make it compatible with laravel, [I wrote about it in the past](/blog/laravel-nest-share-auth), but the token was only compatible if it was generated from laravel first, this time, I made it so is compatible no matter where it got generated first, I will write about it later, and complete my blog post.

### Learning APISIX
from one of my past blog posts, I talked about learing krakend for API gateway, we introduced it to our microservices, but upon using it, we decided to change it, and use something else, the reason is, we didn't like the fact that we had to declare the same endpoint for every HTTP verb, and at least in the open source version, there is no way to declare the routes in an external file, so the configuration file became really bloated.
We are currently in the process of evaluating [Apache APISIX](https://apisix.apache.org/) as a potential API gateway, we managed to copy-paste the [example docker-compose](https://github.com/apache/apisix-docker/blob/master/example/docker-compose.yml) from their github and generate the basic routing for two of our microservices, and just yesterday we found the [youtube channel](https://www.youtube.com/watch?v=JTEPa43ZhWM), where they talked about running apisix in standalone mode, I immediately got an [example running](https://github.com/Boburmirzo/apisix-standalone-deployment-mode), and so far seems like a good candidate to replace krakend