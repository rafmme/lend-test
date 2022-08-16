FROM node:14-alpine

LABEL maintainer="Timileyin Farayola: timileyin.farayola@gmail.com"

ENV NODE_ENV="development"
ENV PORT=5000

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
