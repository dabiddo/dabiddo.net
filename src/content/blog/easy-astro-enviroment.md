---
##layout: ../layouts/Blogpost.astro
title: 'Easy Astro enviroment with VS Remote-Containers'
description: 'Using vscode remote-containers for astro.build enviroment'
pubDate: 2022-09-03
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'Astro is a really cool framework'
jpn: 'https://qiita.com/dabiddo/items/cbcece76804a827ee4e8'
author: 'Dabiddo'
tags: ["astro", "blogging", "learning in public"]
---

I started using VS remote-containers to test different languages, and I found this is the easies way to set up a new development enviroment for Astro.build

Step 1 - Make a general folder

```bash
mkdir astrodev
cd astrodev
```

Once inside the `astrodev` folder, create a new sub-folder called `.devcontainer`

If you already have a Dockerfile, you can use it, else you can use the `node-alpine` docker for a lightweight image.

Create `Dockerfile`

```dockerfile
FROM node:16-alpine 

WORKDIR /app

RUN apk update && \
    apk add git && \
    apk add openssh

ENV HOST 0.0.0.0
EXPOSE 3000

```

Make a new file called `devcontainer.json`

```json
{
    "name":"astro",
    "build": { "dockerfile": "Dockerfile" },
	"forwardPorts": [
		3000
	],
	"customizations": {
		"vscode": {
			"extensions": [
				"astro-build.astro-vscode"
			]
		}
	}
}
```

Once running, VS code will install the astro extension automatically.

Now all that is needed is to open Visual Studio Code, open the `astrodev` folder and it will ask you if you wan to open it in `remote-container`

The first time it runs, it will take a while as it has to download the docker image and build it.

Once it has finished building the image, you can open a new terminal from within VS Code and make sure node is installed

`node --version`

Once confirmed it has installed correctly, you can reference the official Astro.buil documentation to create a new project.

```bash
yarn create astro
...
...
cd my-astro-project
yarn dev

```

Hope you enjoy using astro.

I' m currently using it to make my personal site <a href="www.dabiddo.net">dabiddo.net</a>