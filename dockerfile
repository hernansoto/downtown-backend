# Usa una imagen con Node 20
FROM node:20

# Crea y setea el directorio de trabajo
WORKDIR /app

# Copia package.json y lockfile primero para aprovechar caching
COPY package*.json ./

# Instalación limpia de dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Build del proyecto (compila TypeScript)
RUN npm run build

# Expone el puerto (ajustá si usas otro)
EXPOSE 3000

# Comando para producción
CMD ["npm", "run", "start"]
