---
##layout: ../layouts/Blogpost.astro
title: 'Larabox'
description: "My 1st docker image to use Laravel CLI"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2024-10-26
jpn: '#'
author: 'Dabiddo'
tags: ["docker","laravel","personal"]
---

A few weeks a go, I watched the youtube video of Theo.gg not being able to use Laravel, a few days later, they  released the new CLI that installs both PHP and Composer, and the Laravel CLI to create a new project, that is great for new comers, and based on my testing, you can still use the old `composer laravel/laravel` command to create a new project if you want to, but it got me thinking, I've seen youtubers use the Laravel CLI to create new projects, but I don't use it myself.
So with that in mind, I started playing aroung see if I could embedded the Laravel CLI in a docker image to piggyback from it and use the Laravel CLI without having to install it in my computer, since I just formatted it I thought it was a good chance to work on that project.

I present to you: [Larabox](https://hub.docker.com/r/dabiddo/larabox)

This Docker image is basically a PHP8.3 alpine with both Composer and the Laravel CLI built in, which can be used to create new Laravel project using the prompts.

I have not tested it a lot, that is why the `0.1` tag is used, but initial testing shows promise.

If you want to use it, you pretty much just run the command 

`docker run --rm -it -v "$(pwd)":/app dabiddo/larabox laravel new <new project>`

This will download the docker image and run the Laravel CLI wizard.

I have already add it to my `devcontainer` wizard, but that is a bit of Work In Progress, because I need to run a sub-menu based on the DB selected by the user in the wizard.

Lots of things happening, I also worked on a Schema generator, that is based on Nuxt, for now that repo is private, will make it public once I finish some details.

Thanks for reading.