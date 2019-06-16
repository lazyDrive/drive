FROM node:10

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3344

CMD ["npm", "run", "prod"]
