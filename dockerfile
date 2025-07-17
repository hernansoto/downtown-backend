FROM node:20

WORKDIR /app

# Paso 1: copiar solo package.json y lock
COPY package*.json ./

# Paso 2: instalar dependencias
RUN npm install

# Paso 3: copiar la carpeta prisma antes de generar cliente
COPY prisma ./prisma

# Paso 4: generar cliente Prisma
RUN npx prisma generate

# Paso 5: copiar el resto del código fuente
COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]
