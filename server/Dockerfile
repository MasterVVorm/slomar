FROM node:latest
WORKDIR /app
COPY package.json .
RUN yarn
ADD . /app 
CMD yarn preload
CMD yarn start