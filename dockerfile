FROM node:20

WORKDIR /app

# 1. Copiamos package.json y package-lock.json
COPY package*.json ./

# 2. Copiamos el esquema de Prisma
COPY prisma ./prisma

# 3. Instalamos dependencias (esto ejecuta "postinstall" con prisma generate)
RUN npm install

# 4. Copiamos el resto del proyecto
COPY . .

# 5. Volvemos a generar Prisma Client (con el código ya copiado)
RUN npx prisma generate

# 6. Compilamos el proyecto
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
