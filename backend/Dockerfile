FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

COPY ./ ./

RUN npm install

EXPOSE 8000

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]