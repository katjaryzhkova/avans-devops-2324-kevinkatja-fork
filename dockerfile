FROM node:18
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE ${APP_PORT}
CMD npm run dev