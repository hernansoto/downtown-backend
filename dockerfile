FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

RUN chmod +x ./node_modules/.bin/tsc

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

