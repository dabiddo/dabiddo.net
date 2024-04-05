---
##layout: ../layouts/Blogpost.astro
title: 'Upgrading servers'
description: "kernel panic and panic mode on digital ocean"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'my avatar is cool'
pubDate: 2024-04-05
jpn: '#'
author: 'Dabiddo'
tags: ["digital-ocean", "laravel", "linux"]
--- 

After surviving the layoffs, this week I was tasked with upgrading the servers, we had some VPS running on Ubuntu 18.04 but because we upgraded to Laravel 10 with PHP8.2 we needed to upgrade the servers to the latest version in order to have support for PHP 8.2, I already tested the upgrade procedures on our development enviroment and everything went smoothly so there was no real concern that it would fail on production.

### D-day

so, come tuesday afternoon, I send the general maintainance message to the slack channel about the upgrade and continued with connecting to the server to do the package upgrade first and then the `do-release-upgrade`.

Everything was going smoothly until the time to upgrade Mysql came, I didn´t see the need to upgrade to Mysql 8, so I told the wizard to keep the version, and I think this is what caused the issue because after refreshing the packages, the command said the server needed to reboot, so I clicked 'Y' but the server never came back online `( •_•)` .... </br>
I quickly send a message to my PM, and logged in to DO's admin panel to access the recovery console, and thats where I saw the message:
```
end Kernel panic — not syncing : VFS :Unable to mount root fs on unknown—block(0,0)
```

A quick search led me to this post on digital-ocean community:
https://www.digitalocean.com/community/questions/digital-ocean-kernel-panic-after-cpu-ram-resize

ran the commands, but no luck ... I wasn't able to to mount the image because I did not know the kernel version that was running ...
A bit more of searching led to this post:
https://askubuntu.com/questions/41930/kernel-panic-not-syncing-vfs-unable-to-mount-root-fs-on-unknown-block0-0

which they recommend doing the `dpkg --configure -a` after doing the mounting of the volume, and magic started to happen, as the wizard continue where it left off and finished upgrading the ubuntu server.

And that was the most interesting part of my week.