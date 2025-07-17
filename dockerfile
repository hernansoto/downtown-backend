FROM node:20

WORKDIR /app

# Copiamos solo lo necesario para instalar dependencias primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Forzamos permisos de ejecución sobre el binario de tsc
RUN chmod +x ./node_modules/.bin/tsc || true

# Copiamos el resto del proyecto
COPY . .

# Volvemos a dar permisos por si tsc vino después del copy
RUN chmod +x ./node_modules/.bin/tsc || true

# Ejecutamos el build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
