FROM node:23-alpine3.20

# Install OpenSSL (Alpine 3.14 uses OpenSSL 1.1 by default)
RUN apk update && apk add --no-cache openssl

RUN npm i -g pnpm

# Increase PNPM's network timeout to 600 seconds
RUN pnpm config set network-timeout 600000

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY prisma/schema.prisma ./prisma/
RUN pnpx prisma generate

COPY . .

EXPOSE 8080
CMD [ "pnpm", "start" ]