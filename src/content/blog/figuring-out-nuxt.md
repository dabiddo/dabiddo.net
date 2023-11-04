---
##layout: ../layouts/Blogpost.astro
title: 'Figuring out Nuxt'
pubDate: 2023-11-04
description: 'Learning Nuxt 3'
author: 'Dabiddo'
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'Now you understand my Anime avatar..'
tags: ["nuxt", "laravel", "learning in public"]
jpn: '#'
---

## Job Interviews are hard
Sorry for not posting, but I've had some really rough weeks, between my current job and applying for new Jobs, I haven't been able to update the blog, but here I am.
About the job market, I've been looking for a new job, but haven't had any luck as of yet, and since Christmas is near, most of the companies have paused the recruitment process, still in these months is when Japanese companies open recruitment process, so I still keep on a look out for any possible job offer in Japan.

## Learning Nuxt
In one of the job interviews that I had, I was asked to create a simple CRUD on both Frontend and Backend, since I'm more familiar with Laravel, making the API was simple, but I did have to struggle with Nuxt, its been so long since I last did any Frontend work, so I did my best and create a basic structure of the project
```
API
  --Laravel API
WEB
 -- Nuxt 3 Client
```

I thought this was the right to do it, since Nuxt can just call the local API for laravel and be done with it, and so I finished the test, submit it, and never heard back from the company.. which got me thinking, am I doing this right?, this let to me searching for example repos for Nuxt-3 apps that connect to either external APIs or to Laravel itself.

### My Finds
After looking into example apps, I noticed most of the repos follow the same directory structure, where they create a Laravel app, and inside the laravel app, a folder called `client` which holds the Nuxt 3 app
```
Laravel-APP
--Client
---Nuxt App
```

I also noticed that instead of using Laravels built in API routes, they ask for the `CSRF token`, to do the POST/PATCH request like submiting a normal HTML Form?, this sounds a bit weird to me, since that is why the API route is for, unless you want to control a bit of the security, but then again you can also use Sanctum on the API and create the API key for authorized requests ....

Anyways, because of this, I started checking out some videos on how to use Nuxt, and boy did I get into a rabbit whole....

## Future frontend
Because of the recent video tutorials I've been following, I decided to re-structure my hacktober project in order to follow the "standard" structure of embedding my Nuxt app inside Laravel.

Hopefully, next time I get asked about this, I have the correct answer on how to do the fullstack version of a project with Laravel & Nuxt.