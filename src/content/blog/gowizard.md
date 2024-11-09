---
##layout: ../layouts/Blogpost.astro
title: 'GoWizard'
description: "Migrating from bash file to Golang"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2024-11-09
jpn: '#'
author: 'Dabiddo'
tags: ["docker","golang","personal","bash"]
---

As you know, I have been working on my bash file wizard for creating VsCode Devcontainer enviroments, I use it personally for my pet-projects and at work, but the bash file has become too big so I decided to migrate it to Golang

#### Why Golang?
There really is no technical decision to migrate it to golang, I just really wanted to use the Charm.sh libraries to make the TUI more friendly and colorful, I have use the libraries before by installing them for bash, but now I can use them more freely with Golang, and not put them as pre-requisites.

#### Other updates
While working with these dev-enviroments, and since I use them at work, I kind of ran into an issue, where because my Dockerfiles are run as root, it causes permission issues for git, so this weekend I worked on making thos dockerfiles run as non-root user, for the moment, they only work for laravel projects because I need them for work, but I will be migrating the rest of the Dockerfiles for the other projects during the next few days.