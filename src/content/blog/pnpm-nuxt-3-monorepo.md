---
##layout: ../layouts/Blogpost.astro
title: 'PNPM & Nuxt 3 Monorepo'
description: "Creating a basic monorepo with PNPM and Nuxt-3"
image:
    url: 'https://media.publit.io/file/pnpm_nuxt.png' 
    alt: 'PNPM & Nuxt'
pubDate: 2023-05-20
jpn: '#'
author: 'Dabiddo'
tags: ["pnpm","nuxt"]
---

### Pre-requisites
Before following this guide, you must know that I'm using VSCode DevContainers, you can refer to my [previous post](/blog/easy-astro-enviroment/) on how to setup an enviroment for Astro, to know how I setup the NodeJs enviroment.

This guide is the same as : [setting up a Nuxt Monorepo](https://vueschool.io/articles/vuejs-tutorials/scalable-nuxt-3-monorepos-with-pnpm-workspaces/), except I'm not using the packages directory...yet, you can follow the original guide I you want to also learn how to setup shared components in a monorepo.

### PNPM monorepo
Initiate workspace

`pnpm init`

create the workspace yaml file

`touch pnpm-workspace.yaml`

Inside the yaml file, define the structure of the monorepo

```
packages:
  # all packages in sub dirs of packages/ and apps/
  - 'packages/**'
  - 'apps/**'
```

Intiate a git repo

`git init`

create a `.gitignore` and add the basic node exceptions

```
# .gitignore
node_modules
dist
build
```

Create a `.npmrc` for vue compatibility, this was taken from the original post, referenced in the [Pre-requisites](#pre-requisites).

`touch .npmrc`

```
shamefully-hoist=true
```

CD into the `/app` directory to create the Nuxt applications
```
mkdir apps
cd apps/
```
### Creating Nuxt Apps
Use PNPM to create Nuxt 3 apps
```
pnpm dlx nuxi init <PROJECT NAME>
pnpm dlx nuxi init <PROJECT NAME 2>
```

for every project made, modify their package.json to change the name and port
```
{
  "name": "nuxt-app", //<--change name
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev --port=3010", //<-add port
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "devDependencies": {
    "@types/node": "^18",
    "nuxt": "^3.5.0"
  }
}
```
go back to the root folder and install dependiecies
```
cd..
pnpm i
```

run all projects unsing the pnpm recursive command from root folder

`pnpm -r run dev`

run only 1 project using the 'filter' command

`pnpm --filter PROJECT_NAME run dev`