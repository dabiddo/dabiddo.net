---
##layout: ../layouts/Blogpost.astro
title: 'Small Update'
description: "What I did this week"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'My Avatar'
pubDate: 2026-08-22
jpn: '#'
author: 'Dabiddo'
tags: ["docker","zed","personal"]
---

# This week

It was more about refactoring than learning.

## At work

I kept supervising the new server with the migrated Laravel App on PHP 8.5 and Laravel 13. Everything seems to be working fine, and I still have some tickets I'm currently working on that will be added to the newly migrated branch.

The cool thing is I kept using my new Woodpecker CLI workflow to send the tested fixes to the new environment, and it has worked wonderfully. Which reminds me: I need to update some unit tests that are marked as deprecated due to the codebase migration.

## At home

After hours, I'm testing the Zed editor. I’ve known about it for a long time, but because I use VS Code + devcontainers, I kept putting it aside. Now that it supports devcontainers, I ran out of excuses. This week, I made a few test projects to see how well Zed worked. I did have to modify some project settings and the `devcontainer.json` to make them work, but they ran without issues.

I can't say the same about Podman, though. I haven't been able to make devcontainers work using Podman, so for the time being, I'll stick with Docker.

### Larabox

I upgraded the Larabox image to make it lighter. It was around 900MB, but with the help of Gemini, I reduced it to 670MB. It's not a massive jump, but it makes downloads faster, and I haven't hit any errors creating projects with my `gowizard` script.
