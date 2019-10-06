FROM node:8.16.1-alpine

WORKDIR /app

COPY index.js package.json ./

RUN npm i -g yarn; \
    yarn install;

CMD ["yarn", "serve"]
