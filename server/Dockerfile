FROM node:alpine

WORKDIR /home

COPY . .

RUN npm i -g pnpm@latest

RUN pnpm install

ENV PORT=80

EXPOSE 80

CMD [ "pnpm", "run", "dev" ]