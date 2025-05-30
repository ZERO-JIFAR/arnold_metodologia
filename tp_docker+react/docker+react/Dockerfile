# Imagen base liviana
FROM node:20-alpine
# Crear carpeta de trabajo
WORKDIR /app
# Copiar archivos e instalar dependencias
COPY package*.json ./
RUN npm install
# Copiar el resto de la app
COPY . .
# Construir la app
RUN npm run build
# Exponer el puerto que usa Vite dev
EXPOSE 5173
# Ejecutar el servidor de vista previa de Vite
CMD ["npm", "run", "dev", "--", "--host"]