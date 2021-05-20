FROM node:14.17-alpine3.13

WORKDIR /src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14.17-alpine3.13

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /src/app/dist ./dist

CMD ["node", "dist/main"]