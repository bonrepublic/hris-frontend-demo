FROM node:lts-alpine

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package.json  ./
COPY ./src ./src
COPY ./public ./public

RUN npm install
