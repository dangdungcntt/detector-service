FROM node:10-alpine

WORKDIR /usr/src/app

# Cache db folder
COPY db db
# Cache node_modules
COPY package*.json ./

RUN npm install

COPY src src

EXPOSE 8080

CMD [ "npm", "start" ]
