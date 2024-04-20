---
##layout: ../layouts/Blogpost.astro
title: 'Project Updates'
description: "DevContainer update"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2024-04-20
jpn: '#'
author: 'Dabiddo'
tags: ["devcontainers", "docker", "linux"]
--- 

Hello again!

This week I made some major updates to my [devcontainer wizard](https://github.com/dabiddo/containerwizard) script from a few months a go, since I'm now using frankenPHP, I added the new docer-compose file to the wizard.

You can say I remade it from scratch, because I'm removing the idea of dynamic docker-compose generation, instead I'm just setting pre-made templates that work for me, I might revisit the idea of generating the yml file dynamically, but its really hard to format the files in bash script.

The cool thing about the new script, is I can call it globaly from any directory, because I put it as a global command in my `/usr/local/bin` directory, and I added the one-liner commands to generate other projects, based on my [github-gist](https://gist.github.com/dabiddo/f9a4ca82dc3b55d4c2ffb28672b7ad53).

This last part still has work to be completed, while it does create the projects for Nuxt, NestJs, the devcontainer configurations are empty, that is something I will work on in the near future.
