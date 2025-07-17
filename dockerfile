FROM node:20

WORKDIR /app

COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Generamos el cliente de Prisma
RUN npx prisma generate

# Copiamos el resto del proyecto
COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]
