# Usamos una imagen oficial de Node
FROM node:20

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos necesarios primero
COPY package*.json ./
COPY prisma ./prisma

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Generamos el cliente de Prisma
RUN npx prisma generate

# Compilamos el proyecto
RUN npm run build

# Exponemos el puerto (mismo que usa NestJS)
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "dist/main.js"]
