---
##layout: ../layouts/Blogpost.astro
title: 'CodeLLM with Devcontainers'
description: "Using devpod to use devcontainers"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2025-03-22
jpn: '#'
author: 'Dabiddo'
tags: ["ai", "docker","personal","devcontainers"]
---

## Using Abacus CodeLLM

Last week while using AI to enhance my development workflow, I took the decision to buy an AI subscription.
While doing research, I read about Abacus CodeLLM, their pricing seems reasonable and competitive, and the fact that I have access to different LLM models is a significant advantage.

With the subscription paid, and CodeLLM installed on my computer, I thought I could use my current Devcontainer setup seamlessly, but I was wrong, seems CodeLLM is based on VSCodium, and does not have access to the full set of plugins as VSCode does.

While doing some more research, I found that I could use `devpod` to bridge the gap and make my workflow smoother.

Integrating CodeLLm with Devpod does present some challenges, so in this post, I describe the steps I take to use Devcontainers with CodeLLM and Devpod.

### Notes:
- Ensure you have Docker installed and configured on your system.
- Ensure Devpod is installed and properly configured.
- Ensure CodeLLM is installed and configured correctly.

### Local Plugins
Some plugins need to be installed in CodeLLM before it can support Devcontainers effectively.

```json
ms-vscode-remote.remote-containers
3timeslazy.vscodium-devpodcontainers
ms-azuretools.vscode-docker
```
### Devpod Workspace

Using Devpods UI, create a new workspace either using a local folder, or a git repo, in the IDE I chose NONE.
Usually, Devpod will start the workspace immediately after creation, but you can turn it off.

Using the terminal, go to your workspace directory
`cd <workspace_directory>`
`codellm .`

This will open CodeLLM in the current workspace, it will detect the devcontainer and will ask you to open it, but ignore this prompt
Using the Codellm prompt menu, `Ctrl + p`, search for `Devpod: open workspaces` it will show you the list of workspaces from Devpod, choose your workspace and it will re-open the IDE with the workspace initialization .. `Ctrl+P` again and this time use `Devpod: install local extensions SSH`, this will show the list of local extensions installed in the IDE, choose all of them  and wait for the extension installations to finish

Once all the extensions are installed, close CodeLLM and turn off the workspace in Devpod

Using the CLI again, re-open CodeLLM in directory, and this time when CodeLLM prompts you to re-open in Devcontainer, you can Click on it, this will re-initialize the workspace and installed the rest of the extensions inside your `.devcontainer.json` file.

### Limitations
- When you need to re-create the devcontainer, you will loose all the workspace plugins so you will have to do all these steps again.
- Seems like it does not like using Alpine based Docker images, I kept getting errors when devpod tried installing some sort of VSCode server inside it, so I had to change to using `debian-slim` based images
- For the moment, while I can use git inside the devcontainer, it does not recognize my SSH keys, so when I try to push my commits, I have to use my local terminal.

This is as example Docker of my current Devpod

```Dockerfile
FROM node:20.12.2-bookworm-slim 

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    tar \
    gzip \
    git \
    ca-certificates \
    && npm install -g pnpm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


RUN mkdir -p /app \
    && chown -R node:node /app


USER node


WORKDIR /app

ENV HOST=0.0.0.0


EXPOSE 4321
```

and this is an example devcontainer.json file

```json
{
	"name": "blog",
	"build": {
		"dockerfile": "Dockerfile"
	},
	"features": {
		"ghcr.io/devcontainers/features/git:1": {},
		"ghcr.io/devcontainers/features/sshd:1": {}
	},
	"forwardPorts": [
		4321
	],
	"customizations": {
		"vscode": {
			"extensions": [
				"astro-build.astro-vscode",
				"ms-azuretools.vscode-docker",
				"3timeslazy.vscodium-devpodcontainers",
				"unifiedjs.vscode-mdx"
			]
		}
	},
	"remoteUser": "node"
}
```

## Workaround Update

After chatting with CodeLLM for a while and testig various ways to forward the ssh keys, we came with this workaround.

1. Add the following lines to your `.devcontainer/devcontainer.json` file:
   ```json
   "mounts": [
		"source=<patht_to_your_ssh_key>,target=/tmp/github,type=bind"
	],
	"postCreateCommand": "cp /tmp/github /home/node/.ssh/id_rsa && chmod 600 /home/node/.ssh/id_rsa && ssh-keyscan -t rsa github.com >> /home/node/.ssh/known_hosts"
   ```

2. Add this to the Dockerfile
```Dockerfile

#Add openssh-client to the list of APT packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    tar \
    gzip \
    git \
    ca-certificates \
    openssh-client \ 
    && npm install -g pnpm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create necessary directories and set permissions
RUN mkdir -p /app \
    && chown -R node:node /app \
    && mkdir -p /home/node/.ssh \
    && chmod 700 /home/node/.ssh \
    && chown -R node:node /home/node/.ssh \
    # Create directory for SSH agent socket
    && mkdir -p /ssh-agent \
    && chown -R node:node /ssh-agent \
    && chmod 700 /ssh-agent

# Add known hosts for GitHub
RUN ssh-keyscan -t rsa github.com >> /home/node/.ssh/known_hosts \
    && chown node:node /home/node/.ssh/known_hosts \
    && chmod 644 /home/node/.ssh/known_hosts
```
With these changes, re-create the container, and follow the instructions in the first part of the post, to re-install workspace extensions and re-create the devcontainer