---
title: Blog Remake
slug: blog-remake
description: Remaking my blog
otherLanguages:
  - locale: es
    path: /es/blog/blog-remake
  - locale: jpn
    path: /jpn/blog/blog-remake
---

### Blog Remake

So, here we are once again, redoing y blog, this time I'll try to stick with it, I've found some great tutorials on NuxtJs and how to use the **content** module to create the markdown files, and how to use the translation package to  have my content in both english and japanese.



### Creating the NuxtJS docker container

For the first part, we'll create our development enviroment, using docker and installing the basics needed for nuxtjs.



```
docker container run -it -v $(pwd):/app -w /app node:14.17.1-alpine /bin/sh
```

Inside this container, we install nuxt.

```
npm install --save nuxt
npm install -g create-nuxt-app
```



This will allow us to make a nuxt app from within the container, instead of installing nodejs on local machine.



Now we can create our nuxt project

```
npx create-nuxt-app <project-name>
```

Once done, you can exit the container.

On linux, you have to change the owner of the folder, in order to save changes

```
sudo chown -R myuser:myuser <project-name>
```

### Create Dockerfile

```
FROM node:14.17.1-alpine 

WORKDIR /app

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g @vue/cli \ 
    npm install --save nuxt

ENV HOST 0.0.0.0
EXPOSE 3000

```

Remember to use the same version as the temporary container from the 1st step

Now you can create the docker-compose file

```
version: '3'

services:
  nuxt:
    build: .
    tty: true
    command: npm run dev
    volumes:
      - .:/app
    ports:
      - "3000:3000"
```

Now you can run the project

```
docker-compose up --build
```

And visit `localhost:3000` to view your site page
