---
##layout: ../layouts/Blogpost.astro
title: 'Nuxt with Mysql'
description: "Using NuxtHub module for local dev"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2024-06-01
jpn: '#'
author: 'Dabiddo'
tags: ["devcontainers", "docker", "linux", "github", "bash"]
---

I've been expading my `vWizard` with new templates, this week I wantedto try and get `nuxtJs`to work with `Mysql`, since Nuxt 3 can work as a full stack framework, I wanted to try and see how to work with it.

## vWizard Update

First I made sure that my vWizard script could create a nuxt + mysql devcontainer, that was easy since I based the template on the Laravel docker-compose file.

Once I made sure it could run, it was time to configure Nuxt to accept Mysql.

## Using NuxtHub

Before making any experiments, I googled to see if there was already a plugin or module I could use to work with MySql, and I found `NuxtHub` already has a module that works with both MySql and uses Drizzle ORM, for the most part I followed their guide.

```bash
npx nuxi@latest module add hub
```

Install wrangler:

```bash
pnpm add -D wrangler
```

Add Hub to the `nuxt.config.ts`  and activate the `database` module:
```json
export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    database:true
  }
})

```

## Install Mysql Drivers

For drizzle to work with my version of Nuxt, I had to specify the version.

```bash
pnpm add drizzle-orm@0.29.4
```

Install Mysql-2

```bash
pnpm add mysql2
```

Install Drizzle Kit

```bash
pnpm add -D drizzle-kit
```

Generate a `drizzle.config.ts` on the root of the project

```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'mysql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations'
})
```

Generate the corresponding shema and migrations files

`server\migrations\schema.ts`

Change the Email value, for Mysql

```ts
import { mysqlTable, text, int, timestamp } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    name: text('name').notNull(),
    email: varchar('email', { length: 250 }).notNull().unique(),
    password: text('password').notNull(),
    avatar: text('avatar').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})
```

`package.json` scripts add:
`"db:generate": "drizzle-kit generate"`

### Create the Migrations plugins

`server/plugins/migrations.ts`

make sure the `migrate` function comes from `mysql2`

```ts
import { consola } from 'consola'
import { migrate } from 'drizzle-orm/mysql2/migrator'

export default defineNitroPlugin(async () => {
    if (!import.meta.dev) return

    onHubReady(async () => {
        await migrate(await useDrizzle(), { migrationsFolder: 'server/database/migrations' })
            .then(() => {
                consola.success('Database migrations done')
            })
            .catch((err) => {
                consola.error('Database migrations failed', err)
            })
    })
})
```

#### Utils Drizzle

`server/utils/drizzle.ts`

Make sure the `drizzle` function comes from `mysql2`

and we need to declare the connection, so we need to add `mysql` promise function

```ts
export { sql, eq, and, or } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from '../database/schema'
import mysql from 'mysql2/promise';


export const tables = schema

async function createMySQLConnection() {
    const connection = await mysql.createConnection({
        host: 'mysql', // Update this to your MySQL host
        user: 'dbuser', // Update this to your MySQL username
        password: 'dbpassword', // Update this to your MySQL password
        database: 'drdatabase', // Update this to your MySQL database name
    });

    return connection;
}

export async function useDrizzle() {
    const connection = await createMySQLConnection();
    return drizzle(connection, { schema, mode: 'default' });
}

export type User = typeof schema.users.$inferSelect
```

This is an example `app.vue`for the CRUD:

```vue
<script setup>
const users = ref([])
const myUser = ref()
const form = ref({
  name: '',
  email: '',
  password: ''
});
//const myUser = ref()
const {data} = await useFetch('/api/users');
users.value = data.value;

//const single = await useFetch('/api/users/1');
//myUser.value = single.data;

//console.log(users.value);
//console.log(myUser);

//CREATE A USER
const createUser = async () => {
  try {
    const response = await $fetch('/api/users', {
      method: 'POST',
      body: form.value,
    });
    if (response.error) {
      console.error('Error creating user:', response.error);
    } else {
      console.log('User created successfully:', response.data);
      // Reset the form
      form.value = {
        username: '',
        email: '',
        password: ''
      };
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const details = async (id) => {
  try {
    const { data, error } = await useFetch(`/api/users/${id}`);
    if (error.value) {
      console.error('Error fetching user details:', error.value);
    } else {
      myUser.value = data.value;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};
</script>

<template>
  <div>
    <div><form @submit.prevent="createUser">
    <div>
      <label for="name">name</label>
      <input type="text" id="name" v-model="form.name" required />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="form.password" required />
    </div>
    <button type="submit">Create User</button>
  </form></div>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td><button @click="details(user.id)">Details</button></td>
        </tr>
      </tbody>
    </table>
    <div v-if="myUser">
      <h2>User Details</h2>
      <p>ID: {{ myUser.id }}</p>
      <p>Name: {{ myUser.name }}</p>
      <p>Email: {{ myUser.email }}</p>
      <p>Avatar: {{ myUser.avatar }}</p>
      <p>Created At: {{ myUser.createdAt }}</p>
    </div>
  </div>
</template>

```

With this, I can now use Nuxt 3 a full-stack framework that has DB connection, changing it to use PostgresSql should not be a problem, I can just change the driver to PG, but I haven't tested it yet.