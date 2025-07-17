# Dockerfile actualizado
FROM node:20

WORKDIR /app

# 1. Copiamos archivos necesarios primero
COPY package*.json ./
COPY prisma ./prisma       # 👈 Copiar antes de npm install por el postinstall

# 2. Instalamos dependencias (postinstall incluye prisma generate)
RUN npm install

# 3. Copiamos el resto del código fuente
COPY . .

# 4. Compilamos
RUN chmod +x ./node_modules/.bin/tsc
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
