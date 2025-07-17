FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

# 🔧 Forzar permisos para tsc antes de usarlo
RUN chmod +x ./node_modules/.bin/tsc

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
