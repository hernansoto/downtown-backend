# Usa una imagen oficial de Node.js
FROM node:20

# Crea el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Copia el schema de Prisma
COPY prisma ./prisma

# Instala dependencias y genera Prisma Client
RUN npm install

# Copia el resto del proyecto
COPY . .

# Genera el cliente de Prisma por si acaso
RUN npx prisma generate

# Compila el proyecto (NestJS)
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando para arrancar la app
CMD ["node", "dist/main.js"]
