
# etapa 1
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY .env.production ./
RUN npm install
COPY . .
# hacemos el run build de nuestra app
RUN npm run build

# etapa 2
FROM nginx:alpine
# copiamos el build dentro de nginx
COPY --from=builder /app/dist /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
# exponemos el puerto 80
EXPOSE 80
# que corre en primer plano y que dockerpruebagestionarlo
CMD ["nginx", "-g", "daemon off;"]
