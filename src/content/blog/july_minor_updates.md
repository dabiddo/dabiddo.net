---
##layout: ../layouts/Blogpost.astro
title: 'Minor Updates'
description: "updates on larabox and other stuff"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2025-07-19
jpn: '#'
author: 'Dabiddo'
tags: ["docker", "nuxt"]
--- 

Just some minor updates on various projects and tools.

Thanks to the larabox weekly update, I've been able to keep the packages up to date to their latest versions.
This week Nuxt released their new version 4, and so larabox has been updated to support it seamlessly.
With that, I'm working on a Nuxt project and tried upgrading it to version 4, but some of the plugins are not yet compatible, so I will wait for updates before proceeding further.

For `gowizard`, I made a little update, I added an option to create Nuxt 3 projects, once I see plugins being reported as compatible with version 4, that option will be removed.
I also uptaded the Nuxt and Nodejs docker images to use the latest Node 22 LTS version, previously their where using the v20.

On the personal note, I've been working on a nuxt app, and I've been learning a lot, especially about working with Pinia and store, learning it has been amaizing to not repeat code or do unnecesary api calls.

I also noticed some of the Nuxt project creator have a bug, where they create the project but not add the devcontainer files, I'm vibe coding that to accelerate the fix, will have it in a few a days, a long with other improvements.

That's it for the mini update.
 