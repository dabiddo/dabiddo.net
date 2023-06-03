---
##layout: ../layouts/Blogpost.astro
title: 'Playing with Devpod.Sh'
description: "Trying to find a use to devpod.sh"
image:
    url: 'https://media.publit.io/file/devpod_sh.png' 
    alt: 'Devpod.sh'
pubDate: 2023-06-04
jpn: '#'
author: 'Dabiddo'
tags: ["devcontainer","docker"]
---

# what is Devpod.sh

So, last weekend while I was playing with the Laravel-NestJs blogpost, I stumble upong a youtube video of a tool called 'devpod', curious I clicked on the video, and got interested in trying out the tool.
**So what is devpod?**
[devpod.sh](https://www.devpod.sh) is a desktop app to share development enviroments across different vendors, kubernetes, aws, and local Docker,
from my short time playing with it, it uses devcontainers to setup quick enviroments along with the repositories.

## What did I learn using it?
seems it uses prebuild docker images to setup quick enviroments, and even has the option to connect to different IDEs, or a built in VS Code server to use the browser as an IDE, that was cool.

## Would I use it?
Probably not... since it uses prebuild docker images, I would need to find the right Docker image for my projects, but since it does not work well with local Dockerfile and/or docker-compose, I can't really use it for my local development environments .. in order to use it, I would have to either find a Docker image or build one that has both PHP & Mysql / Postgress and necesary php plugins already installed inside, which defeats the purpose of runing service containers in the first place.
If in turn, I just want to share a quick website that doesn't connect to any database, I would probably use devpod to setup the environment.

## What changed to make it work?
As I said earlier, devpod uses pre build images, can't really use local Dockerfile, so in order to make Laravel work, I created a single `devcontainer.json`
```json
{
  "name": "larapod",
  "image": "php:8.1-fpm",
  "extensions": [
    "felixfbecker.php-debug",
    "editorconfig.editorconfig",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ],
  "settings": {
    "php.validate.enable": true,
    "php.suggest.basic": false,
    "php.executablePath": "/usr/local/bin/php"
  },
  "mounts": [
    "source=/<Route To Project>/larapod,target=/workspace,type=bind,consistency=delegated"
  ],
  "postCreateCommand": "apt-get update && apt-get install -y build-essential default-mysql-client libpng-dev libjpeg62-turbo-dev libfreetype6-dev libzip-dev locales zip jpegoptim optipng pngquant gifsicle git unzip && cd /workspace && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && apt-get install -y libpq-dev && docker-php-ext-install pdo_pgsql && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash && export NVM_DIR=\"$HOME/.nvm\" && [ -s \"$NVM_DIR/nvm.sh\" ] && \\. \"$NVM_DIR/nvm.sh\" && [ -s \"$NVM_DIR/bash_completion\" ] && \\. \"$NVM_DIR/bash_completion\" && nvm install lts/hydrogen && npm install -g pnpm && npm install -g @nestjs/cli",
  "remoteEnv": {
    "COMPOSER_ALLOW_SUPERUSER": "1"
  },
  "services": {
    "db": {
      "image": "mysql:latest",
      "ports": ["3306:3306"],
      "environment": {
        "MYSQL_DATABASE": "laravel",
        "MYSQL_USER": "laravel",
        "MYSQL_PASSWORD": "password",
        "MYSQL_ROOT_PASSWORD": "password"
      },
      "command": "mysqld --general-log=1 --general-log-file=/var/lib/mysql/general.log",
      "volumes": ["mysql_data:/var/lib/mysql"]
    },
    "redis": {
      "image": "redis:latest",
      "ports": ["6379:6379"],
      "volumes": ["redis_data:/data"]
    }
  },
  "forwardPorts": [3306, "db:3306", 8000, "redis:6379"],
  "remoteExtensions": ["ms-vscode-remote.vscode-remote-extensionpack"],
  "volumes": ["mysql_data:/var/lib/mysql", "redis_data:/data"]
}
```

As you can see from the `postCommand`, I had to install all the php-plugins on the image, and for some reason, even thought I declared the database, I can't access it from my host machine.

For a NuxtJs project it was more simple.
```json
{
  "name": "devpodnodejs",
  "image": "node:lts-hydrogen",
  "postCreateCommand": "apt-get install git && npm install -g pnpm",
  //"forwardPorts": [3000,10800],
  "remoteExtensions": ["ms-vscode-remote.vscode-remote-extensionpack"]
}
```
For the time being, I will continue to use my local Docker for development, but I'll keep devpod.sh on my twitter list, to see if they have any important changes about this.