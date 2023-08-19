---
##layout: ../layouts/Blogpost.astro
title: 'Working with Devcontainers'
description: "Learning more and more about devcontainers to make my life easier"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2023-08-19
jpn: '#'
author: 'Dabiddo'
tags: ["vscode", "devcontainers"]
---

## Working with Devcontainers
As you have seend from previous post, I don't like installing languages or plugins on my computer, ever since I discovered `Docker`, I like
working with containers because I can downgrade or upgrade language versions easily.

Working with devcontainers has been really awesome, even though I only know a little, I have been able to share my enviroment configuration with my co-workers and don't have to worry if they have the right version or the right extensions installed, since I can just declare it in the json file.

I have been doing a lot of experiments lately in my computer, and I found my self copy-pasting my `.devcontainer` folder from one project directory to another, therefore I am now creating my bash scripts that takes my standard `.devcontainer` and recreates it between projects.

I leave the link here: [containerwizard](https://github.com/dabiddo/containerwizard)

Now, this script is very biased on what I use, but if you find it usefull, or want to expand it, please do so.. any help is very much appreciated.

For this script I'm using Charm's [Gum](https://github.com/charmbracelet/gum) extension, to add color and make it look cool, so you need to have the extension installed before running the script.

### Building better devcontainers
Working with this script, has made me a bit curious on what enhancements I can make to my configuration. While searching on youtube, I found this cool presentation by [Chris Ayers](https://youtu.be/HV7LJ_LUZ5A), where he explains how to work with devcontainers, and its not a deep dive, but it made me realize I have a lot to learn on making my configuration easier to read and automate.

With that in mind, I have the crazy idea to experiment with new devcontainer configurations and do a better script for my projects.