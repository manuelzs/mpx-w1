FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY ./server/package.json ./server/
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn workspace @mpx/server build
EXPOSE 8000
ENV PORT 8000
CMD ["node", "./server/dist/index.js"]
