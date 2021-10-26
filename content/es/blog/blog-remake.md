---
title: Rehaciendo mi Blog
slug: blog-remake
description: Rehaciendo mi blog
otherLanguages:
  - locale: en
    path: /blog/blog-remake
  - locale: jpn
    path: /jpn/blog/blog-remake
---

### Blog Se Renueva

Aqui estoy una vez mas rehaciendo mi blog, esta ocacion intentare ser mas puntual, he encontrado buenos tutoriales de NuxtJs y de como usar el modulo de **contenido** para crear archivos markdown, y he estado leyendo como usar el packet de traduccion para mostrar el contenido en Japones e Ingles.




### Creando un Contenedor de NuxtJs

Para la primera parte, crearemos nuestro ambiente de desarrollo usando docker, e instalando lo basico para NustJs.



```
docker container run -it -v $(pwd):/app -w /app node:14.17.1-alpine /bin/sh
```

Dentro del contenedor, instalamos NuxtJs

```
npm install --save nuxt
npm install -g create-nuxt-app
```


Esto nos permitira crear una nueva aplicacion desde adentro del contenedor, sin tener que instalar NodeJs en la maquina local.



Ahora podemos crear nuestra aplicacion de Nuxt

```
npx create-nuxt-app <project-name>
```

Una vez que se haya terminado el proceso, puedes salir del contenedor

En linux, ocupas cambiar los permisos de la carpeta a tu usuario, para poder salvar futuros cambios

```
sudo chown -R myuser:myuser <project-name>
```

### Crear archivo Dockerfile

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

Recuerda usar la misma version del contenedor temporal del 1er paso.

Ahora puedes crear el archivo docker-compose

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

Ya puedes iniciar el proyect

```
docker-compose up --build
```

Visita `localhost:3000` para ver tu pagina.
