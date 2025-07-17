FROM node:20

WORKDIR /app

# Copiar package.json + lockfile
COPY package*.json ./

# Copiar carpeta de Prisma (necesaria para generar el cliente)
COPY prisma ./prisma

# Instalar dependencias
RUN npm install

# Generar el cliente Prisma (ya tiene schema)
RUN npx prisma generate

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]
