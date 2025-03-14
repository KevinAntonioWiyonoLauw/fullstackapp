FROM node:23-alpine3.20

# Install OpenSSL and dependencies
RUN apk update && apk add --no-cache openssl

# Install pnpm and rimraf globally
RUN npm i -g pnpm rimraf

# Increase PNPM's network timeout to 600 seconds
RUN pnpm config set network-timeout 600000

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY prisma/schema.prisma ./prisma/
RUN pnpx prisma generate

COPY . .

EXPOSE 5000
CMD [ "pnpm", "start:docker" ]