---
##layout: ../layouts/Blogpost.astro
title: 'ChatGPT and Other stuff'
description: "using ChatGTP to get out of trouble"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2023-03-18
jpn: '#'
author: 'Dabiddo'
tags: ["docker","chatgpt","java"]
---

### Work Related
So, at work we are nearing Demo-day, because of it, the pressure is on, and work has increased to get the App to a stable level, because of this, and in order to minize new feature we have to develop, to concentrate on bug-fixing, we decided to re-use some features from the old legacy app

### The issue
The issue is, one of the modules used in the old system is made in JAVA, is sort of a microservice, but it really is just a Query Creator that helps on simulating a boolean search.

### The Challenge
The challenge is, because we migrated to a new DB Schema, and new microservice infrastructure using Docker, and given that I have never worked with Java, I needed to make some research on how exactly that service worked, and see if it was possible to dockerize it, in order to deploy it to the new infrastructure.

First things first, my challenge was to make it work inside docker, I went with some basic images for java & tomcat, but no real progress, my co-worker checked some of the scripts and went into the current server and noticed that it uses jellyfish, so we went and looked into a docker image for jellyfish and learned how to deploy a `.war` file.

seeing us struggle, our boss suggested we ask ChatGPT for help, so we went and did just that, and while the images suggested by ChatGPT didn't work either, ChatGPT suggested we change the image to [Payara server](https://www.payara.fish/downloads/payara-docker-images/).

It took our co-worker and I a whole morning, searching for different images, and chatGPT only 15 min. to recommend a working image and best of all, the `Dockerfile` is 4 lines long, since everything is already pre-configured.

### What Now?
Now that we know how to dockerize it, the challenge is to compile it for new builds, since the code needs fixing for the new DB Schema, we need a build process, and also integration into our CI/CD process for deployments into our private docker registry.