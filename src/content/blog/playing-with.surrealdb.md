---
title: 'Playing With SurrealDB'
pubDate: 2023-02-11
description: 'Getting to know this awesome NoSql DB'
author: 'Dabiddo'
image:
    url: 'https://media.publit.io/file/Playing-with-SurrealDB.png' 
    alt: 'Getting Started'
tags: ["surrealdb", "development", "docker", "vscode"]
jpn: '#'
---

## Getting Started
I've know about SurrealDB for a few months now, and while its still in beta, I'm using to play around and develop a side project.
getting started was real easy, their guide is really easy to follow, but I did run into some minor issues.

### Using Docker
I didn't want to install Surreal in my laptop, since I won't be using it much, so I decided to go with their docker image.

Following the guide was easy, but I couldn't make the HTTP request work, as it turns out, their guide does not tell you how to set the username / password for starting the docker image.
`docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start --user root --pass root`

With this command, following the guide to make HTTP requests should work.

### Using it with docker-compose
Using it with docker was easy, and I whent through their guide fairly quickly, getting to know all the commands.
Being the developer that I am, I got the idea of connecting it to my Nuxt 3 Project, so I got to work on making a `docker-compose.yaml` file.

```
version: '3.8'

services:

  surrealdb:
    image: surrealdb/surrealdb:latest
    container_name: surrealdb
    ports:
      - "8000:8000"
    stdin_open: true
    tty: true
    command: 
      - start
      - --user=root
      - --pass=root
    restart: always

```
This worked, but reading the Documention, I stumble upon the CLI tool for backup, and wanted to give that a try, but seems like the SurrealDB image does not have `bash` installed, and I could not connect to it.

### Github Issues to the rescue.
Seeing as I could not connect to the image, I started searching on their github-issues forum, to see if anyone has asked the question earlier.
lo and behold for [issue #1385](https://github.com/surrealdb/surrealdb/issues/1385)

Following the comment from [LeopoldBriand](https://github.com/LeopoldBriand), for explaining how to copy the ssh from one image to the surrealdb image, and his `docker-compose` file, this made my life easier.
And thanks to [bakman2](https://github.com/bakman2) for explaining how to expose the database file.

Dockerfile

```
FROM busybox:1.35.0-uclibc as busybox

FROM surrealdb/surrealdb:latest
COPY --from=busybox /bin/sh /bin/sh
COPY --from=busybox /bin/mkdir /bin/mkdir
COPY --from=busybox /bin/cat /bin/cat
COPY --from=busybox /bin/chmod /bin/chmod
ENTRYPOINT /surreal start --log debug --user $DB_USER --pass $DB_PASSWORD file://database.db
```
docker-compose.yaml
```
version: '3'

services:
  db:
    env_file:
      - ./.env
    build:
      args:
        - DB_USER=${DB_USER}
        - DB_PASSWORD=${DB_PASSWORD}
      context: ./
      dockerfile: Dockerfile
    image: db
    ports:
      - 8000:8000
    volumes:
      - ./data/database.db:/database.db
```
.env file
```
DB_USER=root
DB_PASSWORD=root
```

With these 3 files, I was able to run surrealdb, and connect to the image:<br>
`docker ps`<br>
`docker exec -it <DOCKER IMAGE ID> /bin/sh`

For running the back up command:

`/surreal export --conn http://localhost:8000 --user root --pass root --ns test --db test export.sql`<br>
The command must start with '/surreal' as described in the Dockerfile.

Now that I have the surrealDB running on docker-compose, I should have no trouble connecting it with my Nuxt 3 project right ...?<br>
thats is a post for another day.