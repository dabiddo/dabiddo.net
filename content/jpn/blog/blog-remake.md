---
title: ブログのリメイク 
slug: blog-remake
description: ブログのリメイク
otherLanguages:
  - locale: en
    path: /blog/blog-remake
  - locale: es
    path: /es/blog/blog-remake
---

### ブログのリメイク

それで、ここでもう一度ブログをやり直します。今回はそれに固執しようとします。NuxtJに関するいくつかの素晴らしいチュートリアルと、**content** モジュールを使用してマークダウンファイルを作成する方法を見つけました。 翻訳パッケージを使用して、英語と日本語の両方でコンテンツを作成する方法。



### Creating the NuxtJS docker container

最初の部分では、dockerを使用して開発環境を作成し、次のjsに必要な基本をインストールします。 



```
docker container run -it -v $(pwd):/app -w /app node:14.17.1-alpine /bin/sh
```

このコンテナ内に、nuxtをインストールします。

```
npm install --save nuxt
npm install -g create-nuxt-app
```



これにより、ローカルマシンにnodejsをインストールする代わりに、コンテナー内からnuxtアプリを作成できるようになります。



これで、nuxtプロジェクトを作成できます

```
npx create-nuxt-app <project-name>
```

完了したら、コンテナを終了できます。

Linuxでは、変更を保存するために、フォルダーの所有者を変更する必要があります

```
sudo chown -R myuser:myuser <project-name>
```

### Dockerfileを作成する

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

最初のステップの一時コンテナと同じバージョンを使用することを忘れないでください

これで、docker-composeファイルを作成できます

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

これで、プロジェクトを実行できます

```
docker-compose up --build
```

そして、 `localhost：3000`にアクセスしてサイトページを表示します
