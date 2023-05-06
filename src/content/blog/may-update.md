---
##layout: ../layouts/Blogpost.astro
title: 'May Update'
description: "Lots of work, no blog post..."
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'default background'
pubDate: 2023-05-06
jpn: '#'
author: 'Dabiddo'
tags: ["docker","nestjs","laravel"]
---

## May Update
Long time no blog, I've been busy with work, we've had a lot of demos on april, that made my workload increase, and that is why I wasn't able to blog last month.

## What I've been Learning
As of lately, I had to get reacquainted with Websockets, we want to make a `notification-center` for our system, and we don't want to pay any extra service, therefor, we concluded that making our own websocket server is better.

### Migrating Laravel
One other task that I've been working on, is getting the websocket authorization to be compatible with Laravel, since V-2 of our system is already being migrated to NodeJs using NestJs-framework, it made sense to make websockets in NestJs, but with an extra compatability layer for accepting `laravel:passport` created JWT tokens, that took a whole week to figure out, but we were able to make it happen, I'm planing to do a whole blog post on how we did it.

With that, I leave you, hoping to blog soon and show some code for future posts.