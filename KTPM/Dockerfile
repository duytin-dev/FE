# ===== Stage 1: Build =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite nhúng biến lúc build — Render truyền env cùng tên ARG vào docker build
ARG VITE_BACKEND_URL=https://be-2-emw3.onrender.com/api/v1
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

# ===== Stage 2: Nginx =====
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]