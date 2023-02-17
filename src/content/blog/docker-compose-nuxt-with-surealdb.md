---
title: 'Docker-compose Nuxtjs with SurrealDb'
pubDate: 2023-02-16
description: 'Making docker-compose play nice with NuxtJs and SurrealDB'
author: 'Dabiddo'
image:
    url: 'https://media.publit.io/file/Playing-with-SurrealDB.png' 
    alt: 'surreal'
tags: ["surrealdb", "development", "docker", "vscode", "nuxtjs"]
jpn: '#'
---

## Using what I learned.
From what I learned making surrealDB work with docker-compose, I wanted to try and display the data on NuxtJs.

### Why NuxtJs?
Because I like vue, and I've been using it since the beta, and Nuxt makes things easier when building full frontend apps, and with the new api server powered by nitro, we can make fullstack apps.

## Making the basic NuxtJs Dockerfile
extending the `.devcontainer` from previous posts, we use the basic Dockerfile for nodejs.
```
FROM node:16-alpine 

WORKDIR /app

RUN apk update && \
    apk add git && \
    apk add openssh

RUN npm install -g pnpm

ENV HOST 0.0.0.0
EXPOSE 3000
EXPOSE 8000
```

### Extending the docker-compose.yaml
We extended the docker-compose.yaml to add the nuxtjs / nodejs Dockerfile

```
version: '3'
networks:
  nuxtNetwork:
    name: nuxtNetwork
services:
  db:
    env_file:
      - ./.env
    build:
      args:
        - DB_USER=${DB_USER}
        - DB_PASSWORD=${DB_PASSWORD}
      context: ./
      dockerfile: edge.Dockerfile
    image: db
    ports:
      - "8000:8000"
    networks:
      - nuxtNetwork
    volumes:
      - ../data/database.db:/database.db
  app:
    build: 
      context: ./
      dockerfile: Dockerfile
    tty: true
    volumes:
      - ../:/app
    ports:
      - "3000:3000"
    networks:
      - nuxtNetwork
    depends_on:
      - db
```

This file will help us run all needed containers, the last part neede is to update the `devcontainer.json` file

```
{
    "name": "nuxt3surreal",
    "service": "app",
    "workspaceFolder": "/app",
    "dockerComposeFile": [
        "docker-compose.yaml"
		],
		"customizations": {
			"vscode": {
				"extensions": [
					"MisterJ.vue-volar-extention-pack",
					"dbaeumer.vscode-eslint",
					"Vue.volar",
					"steoates.autoimport",
					"christian-kohler.path-intellisense"
				]
			}
		}
}
```

Once we have everything ready, we can build and run the `.devcontainer` and presto, we can connect to the nodejs (app) and create a new nuxt project.

Next step will be to finally connect SurrealDB with Nuxt api server, and display data.
