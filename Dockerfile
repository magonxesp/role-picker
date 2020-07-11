FROM node:14.5.0-buster

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
