FROM node:20.10.0

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]