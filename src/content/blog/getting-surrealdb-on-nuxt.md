---
title: 'Getting Nuxt data from SurrealDB'
pubDate: 2023-02-18
description: 'Making connection from Nuxt too SurrealDB'
author: 'Dabiddo'
image:
    url: 'https://media.publit.io/file/Playing-with-SurrealDB.png' 
    alt: 'surreal'
tags: ["surrealdb", "development", "docker", "vscode", "nuxtjs"]
jpn: '#'
---

## Connecting SurrealDB with Nuxt

After making an empty nuxt project, and testing the surrealDB API still works, we can start showinf that data on our page.

### FULL DISCLAIMER

We'll be using the new Nitro plugin, and from what I read on their documentation, this is not the best way to do it, but all other tutorials I found online, all use this method of exposing the connection as a plugin, instead of using nitros built-in storage.

### Enter Nuxt API server

As with most JS frameworks now a days, Nuxt comes with support for making local api requests, this makes is convenient to call either external APIS and mask those calls, or in our case simulate an API call that calls our local database.

### Making a basic request

Before we head to connecting surreal, we need to make a basic example on how to get the data.

insite de nuxt project, create a `server/api/persons`directory, and create a file called `index.get.ts`

If you need to know why we named the files as is, please head to this [medium post](https://medium.com/@shahriarrahi/create-api-with-nuxt3-adcb7b6a17dd) where I learned how to use the api server.

After we have the file, we make a simple handler.

```js
export default defineEventHandler((event) => {
  return {
    api: 'works'
  }
})
```

Then head back to nuxt index page, and make a simple request

```js
const dataResponse = ref()
fetch("/api/persons").then((response)=>{
    dataResponse.value = response
}).catch(error=>{
        console.log(error)
    })
</script>
```

This will only alert that there is an object in the response.

### Install SurrealDB client library

We'll start with the basic, following SurrealDB docs, we need to install the [NodeJS client library](https://surrealdb.com/docs/integration/libraries/nodejs)

The next part, I got from 2 different tutorials:

[flankers how to connet to mongodb](https://medium.com/@flanker72/nuxt3-complex-solutions-database-integration-8df941f0fb82)

..can't find the 2nd tutorial :(

Inside the `server` directory we make 2 new files, `surrealdb.ts` and `index.ts`

surrealdb.ts will handle creating the connection with the client library.

```js
import Surreal from "surrealdb.js";
const db = new Surreal('http://db:8000/rpc');

export async function initDB() {
    console.log('making db connection');
    try{
        await db.signin({
            user: 'root',
            pass: 'root',
        });
        console.log('DB intialized');
        await db.use('test', 'test');
    }catch (e) {
		console.error('ERROR', e);
	}
}

export default db;
```

The 2nd file will expose that connection as a plugin.

```js
import {Nitro} from 'nitropack'
import { initDB } from './surrealdb';

export default async (_nitroApp:Nitro) => {
    initDB();
}
```

If you checked flakers tutorial, we need to expose the plugin on our `nuxt.config.js`

```js
export default defineNuxtConfig({
    nitro:{
      plugins:['~/server/index.ts']
    }..
```

Now when we run the project we can see the messages `DB initalized`.

Head to the `persons.get.ts` file and extend it for the surreal request.

```js
import db from '~~/server/surrealdb';


async function find() {
	let persons = await db.select("person");
	return persons;
}

export default defineEventHandler(async (event) => {
	return find();
  })
```

We need to make little changes to the `index.vue` fetch method to correctly parse the json response

```js
<template>
    <div>
            {{ dataResponse }}
    </div>
</template>
<script setup>
const dataResponse = ref()

fetch("/api/persons").then((response)=>response.json()).then((data)=>{
    dataResponse.value = data;
    }).catch(error=>{
        console.log(error)
    })
</script>
```

With this, we can make our fullstack nuxt app.