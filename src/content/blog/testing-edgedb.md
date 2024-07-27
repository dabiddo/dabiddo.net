---
##layout: ../layouts/Blogpost.astro
title: 'Testing EdgeDB'
description: "playing with EdgeDB"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2024-07-26
jpn: '#'
author: 'Dabiddo'
tags: ["edgedb","docker"]
---

I have been wanting to play with edgedb, but when running the docker example in the docs, it fails for me, that is until I tested the docker-compose file,
even with the docker-compose I still have some issues, but at least I have been able to play with it a little.

### Little modification
In order to test the edgedb UI, some extra ports need to be added to the docker compose file

```yaml
version: '3.8'

services:
  edgedb:
    image: edgedb/edgedb
    container_name: edgedb
    ports:
      - "5656:5656"
      - "10700:10700"
    volumes:
      - edgedb_data:/var/lib/edgedb/data
      - "./experiment:/dbschema"
    environment:
      - EDGEDB_SERVER_SECURITY=insecure_dev_mode
      - EDGEDB_SERVER_BIND_ADDRESS=0.0.0.0
      - EDGEDB_SERVER_DEFAULT_DATABASE=mydatabase
      - EDGEDB_SERVER_DEFAULT_USER=edgedb

volumes:
  edgedb_data:
```

From the volumes you will see a local `experiment` folder that will be created on run.
After all of this is ready, you can run the image `docker compose up`

### Login into the image

For the next part, I am using lazydocker to connect to the edgedb image, but you can do it with from any terminal

`docker exec -it edgedb`

once inside the container change to the edgedb used

`su edgedb`

the prompt will show `$`

from here cd into the dbschema folder, and run the project init

`edgedb project init`

Once created, you can edit the schema in VSCode and run the migrations.

When editing the files in VSCode, you might have to change the permissions, and change them back from within the edgedb docker image. `chmod -R user:user /experiment`

`edgedb migration create`

`edgedb migrate`

and run the UI

`edgedb ui`

Because of the whole changing permissions, is a bit awkward, once I find a better way I will share it here, but for now I can play around edgedb, my plan is to add it to a nuxt project, and if all goes well, I can add it a `vwizard` template