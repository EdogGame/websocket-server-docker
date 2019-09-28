FROM node

WORKDIR /app

COPY index.js package.json ./

RUN npm i -g yarn; \
    yarn install;

EXPOSE 8080

CMD ["yarn", "serve"]
