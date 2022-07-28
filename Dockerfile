# Build dependencies
FROM node:16-alpine as dependencies

WORKDIR /app

COPY package.json .
COPY prisma ./prisma/

RUN yarn

COPY . . 

# Build production image
FROM dependencies as builder

# RUN npm run build
EXPOSE 3001

# CMD yarn start:migrate
CMD ["yarn", "start:migrate"]