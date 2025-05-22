---
##layout: ../layouts/Blogpost.astro
title: 'Devpod Git SSH credentials'
description: "Mount local git credentials in a devpod devcontainer."
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2025-05-22
jpn: '#'
author: 'Dabiddo'
tags: ["docker","personal","devcontainers","devpod","git"]
---

## My Struggle with making Devpod accept my Git Credentials

As for one of my past posts, you know I struggled a bit with making Abacus CodeLLM work with devcontainers.

Once I got past that hurdle, a new challenge emerged: ensuring my Git credentials were properly mounted and accessible within the devpod environment.

I tried various methods, and from my past post, I ended up hardcoding my SSH path into the Devcontainer, this worked, but I still thought it looked ugly and it did not work 100% of the time ..

Upon further research I stumbled upon this blog post from [Marc Andreu](https://marcandreuf.com/blog/2024-07-12-gitdevcont/) where he detailed a cleaner and more reliable approach to mounting Git credentials in devcontainers.

The `mount` property is the same as my Post, except he also mounted the `gitconfig` for the Identity, that is was missing from my configuration, when added, I stopped getting errors and CodeLLM was able to push/pull changes to my remote repository

With this change, I have not updated my `goWizard` script yet, but I will do so in the future to have that mount in the devcontainer template.