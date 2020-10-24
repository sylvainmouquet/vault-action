FROM node:lts

WORKDIR /data

COPY package.json /data/package.json
COPY package-lock.json /data/package-lock.json

RUN npm install  --save-dev

COPY . /data

RUN npm run build