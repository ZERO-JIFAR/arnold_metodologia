FROM node:18
# creando una app del docker
WORKDIR /app
COPY package*.json ./
RUN npm install
# codigo fuente
COPY . .
# exponemos el puerto 3001 el mismo que el server.js
EXPOSE 3001
# ejecutamos en terminal
CMD [ "npm", "start" ]