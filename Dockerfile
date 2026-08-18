FROM node:24-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine3.23

COPY --from=builder /app/dist /usr/share/nginx/html
# Rendered by the base image's envsubst at container start, so TICKER_API_URL is
# a runtime setting rather than a mount. The default only keeps nginx starting --
# it resolves an unset variable and an unresolvable upstream is a fatal error, so
# without it the container would exit instead of serving the app. Override it with
# the address of your API.
ENV TICKER_API_URL=http://127.0.0.1:8080/v1
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
