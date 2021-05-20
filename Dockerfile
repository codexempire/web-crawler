FROM node:14.17-alpine3.13

WORKDIR /src/app

COPY package.json ./

RUN npm install --force

RUN npm install rimraf --force

COPY . .

RUN npm run build

CMD [ "node", "./dist/main.js" ]