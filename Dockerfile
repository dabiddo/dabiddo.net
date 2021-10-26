FROM node:14.17.1-alpine

WORKDIR /app

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g @vue/cli \
    npm install --save nuxt

ENV HOST 0.0.0.0
EXPOSE 3000
