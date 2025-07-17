FROM node:20

WORKDIR /app

# 1. Copiamos primero package.json y lock
COPY package*.json ./

# 2. Copiamos la carpeta prisma
COPY prisma ./prisma

# 3. Instalamos dependencias y se genera Prisma Client por postinstall
RUN npm install

# 4. Copiamos el resto del código
COPY . .

# 5. Compilamos
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
