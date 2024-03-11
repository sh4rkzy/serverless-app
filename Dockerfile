FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install -g serverless

COPY . .
RUN npm run test

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["sls", "offline", "start", "--host", "0.0.0.0"]