# build stage
FROM node:lts-alpine3.16 as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE $PORT_CLIENT
CMD ["nginx", "-g", "daemon off;"]