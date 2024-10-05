---
##layout: ../layouts/Blogpost.astro
title: 'Learning more about DevContainers'
description: "Brushing up on tips and tricks"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'My Classic background'
pubDate: 2024-10-11
jpn: '#'
author: 'Dabiddo'
tags: ["personal","docker", "vscode"]
---

Lately because of work I've had to brush up on my DevContainer skills, while I managed to get the project up and running for laravel pretty easily, I struggled a full day to get a Python/Django api working using devcontainers, it was not as straighforward as I thought, so these past few days, I have been brussing up on tips and tricks for devcontainers in order to get that Django API a better devcontainer configuration.

### Sharing my Git credentials
One of the weird things about working with devcontainers, is that I have my github ssh key, and most of my Dockerfiles have git installed, but when trying to use git from withing the devcontainer terminal, my host machine does not share the Git credentials to the container, and so I get asked to setup a username / email.

While looking online and with a bit of help from chatgpt I managed to get it working by configuring two things:
* Trust the directory workspace
* Mount my github private key in the containers .ssh directory

```json
{
	"name": "blog",
	"settings": {
		"security.workspace.trust.enabled": true
	},
	"build": {
		"dockerfile": "Dockerfile"
	},
	"forwardPorts": [
		3000,
		4321
	],
	"mounts": [
		"source=${env:SSH_AUTH_SOCK},target=/ssh-agent,type=bind"
	],
	"remoteEnv": {
		"SSH_AUTH_SOCK": "/ssh-agent"
	},
	"postStartCommand": "ssh-add /home/vscode/.ssh/github",
	"customizations": {
		"vscode": {
			"extensions": [
				"astro-build.astro-vscode"
			]
		}
	}
}
```

This is how my Blog `devcontainer.json` file is structured

Since not everyone uses the Git SSH keys, I will not be adding the config to the `vcontainer` wizard, but I will leave it here for future references, because I still need to add this to my work repo.

#### Update
Seems this trick only works on node-bookworm devcontainers, I tried doing the same in my Laravel project using `frankenPHP` but no luck, I'll keep trying and searching for possible solutions to laravel

#### New Update
The configuration presented here works, but because my frankenPHP container is running as `root`, I can't replace the `.gitconfig` from my host PC,so whenever I re-build my container, I have to set the directory as safe, and add my git username/email to the local repo in order for it to work.