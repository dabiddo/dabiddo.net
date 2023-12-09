FROM node:18.17-bookworm-slim 

WORKDIR /app

RUN apt update
RUN apt install git -y
#RUN apt install openssh -y
RUN npm install -g pnpm

ENV HOST 0.0.0.0
EXPOSE 3000