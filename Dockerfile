FROM node:0.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build
RUN rm -rf /usr/src/app/lib
RUN rm -rf /usr/src/app/node_modules && npm install --production

ENV NODE_ENV production
EXPOSE 3000

CMD [ "npm", "start" ]