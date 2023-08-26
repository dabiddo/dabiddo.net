---
##layout: ../layouts/Blogpost.astro
title: 'Devpod Round 2'
description: "Testing new version of Devpod with docker-compose"
image:
    url: 'https://media.publit.io/file/devpod_sh.png' 
    alt: 'devpod.sh'
pubDate: 2023-08-26
jpn: '#'
author: 'Dabiddo'
tags: ["vscode", "devcontainers", "devpod", "docker"]
---

## New version of Devpod
So, last week I came across `devpod` tweet promoting their new version `0.3.4`, from my previous post, I wasn't able to make it work with docker-compose, but these last few weeks I've been learning a lot about `devcontainers`, so I thought I would give it another try, and upgraded to their new version.

### Testing devcontainer template
Before testing with my docker-compose configuration, I thought I try one of the `devcontainer` templates freely available.
I chose the [PHP & MariaDB](https://github.com/devcontainers/templates/tree/main/src/php-mariadb) template, after downloading the files locally and opening `devpod`, it all seemed to work fine.

### Modifying my own docker-compose file
Since devpod was able to open the `docker-compose` file just fine, I went and compare the template with my own file and made some changes.
* merge both `docker-compose.yml` & `docker-compose.workspace.yml` to a single file

I think this is was confusing devpod when running my devcontainers, I have 2 separate docker-compose files, I had them this way because when I was first learning how to use devcontainers, I wasn't able to get the sigle compose.yml file to run, it always asked for a `workspace`, and after much fiddleling and searching example githubs, I found that having the `workspace` in a separate file made it work, but with this template, I now know that the workspace is actually declared in the `devcontainer.json` file and references what service the app is going to the main workspace.

### New features?
I've been learning about adding `features` to the devcontainer, but I haven't add them to my container images, and at least for the `PHP 8.1` containers, every PHP extension is added in the `Dockerfile`

### Updating my devcontainerwizard script
From my previous post, I've been working on a bash script that creates `devcontainer` folders based on my everyday used templates, everything I learned this week is already reflected on the script, I have already tested generating a new container project and have devpod run it, still need a bit of tunning, but I'm happy that it works.