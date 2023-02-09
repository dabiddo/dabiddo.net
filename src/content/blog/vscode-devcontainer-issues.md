---
title: 'VSCode .devcontainer Issues'
pubDate: 2023-02-08
description: 'Dealing with docker issues in .devcontainers'
author: 'Dabiddo'
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'My face looking for a fix'
tags: ["astro", "blogging", "docker", "vscode"]
jpn: '#'
---
## .Devcontainers
I'm working from personal computer, using KDE-Neon, I've been using linux for the past year or so, without issues, and the minor issues I've had, there is always a fix.

Come today, and after updating my distro, I tried running my `devcontainer` enviroment for astro, and behold, an error appears preventing me from starting my enviroment.

Looking at the logs, I found a pretty recent [github issue](https://github.com/microsoft/vscode-remote-release/issues/7958)
as described in the temporary fixes, I added the builkit argument to my `devcontainer.json` file, and everything worked correctly

```
"build": { "dockerfile": "Dockerfile", "args": {
		"BUILDKIT_INLINE_CACHE": "0"
	} },
```

## Problem fix right?
Not exactly, I have a NestJs enviroment that uses `docker-compose.yaml` files to run my enviroment and a MySql database.
For the moment, that enviroment still fails.

By watching the logs, I see it overrides my docker-compose file with one that has `BUILKIT_INLINE_CACHE:1` even if I set it to `0` on mine.
hopefully it gets fixed soon, I see people having the issue when using docker-compose

## Mini Update
Following the github thread, I opted for downgrading to Docker 20.10, I'm now able to run my NestJs docker-compose enviroment.
for downgrading, I followed the official Docker Guide on [installing a specific version](https://docs.docker.com/engine/install/ubuntu/)