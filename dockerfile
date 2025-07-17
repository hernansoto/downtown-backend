FROM node:20

WORKDIR /app

# Instalar deps primero
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Asegurar schema y generar Prisma
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
