FROM node:12-alpine AS dev
RUN apk update --no-cache && \
  apk upgrade --no-cache && \
  apk add iputils curl --no-cache && \
  npm install --silent --save-dev -g typescript@3.8.3
RUN tsc -v
WORKDIR /app
COPY package.json yarn.lock jest.config.js tsconfig.json tslint.json /app/
RUN yarn install --dev --frozen-lockfile
COPY source/ /app/source/
RUN tsc
RUN chown -R node:node /app
ENV PATH /app/node_modules/.bin:$PATH
USER node
CMD ["node", "dist/main.js"]

FROM node:12-alpine AS release
RUN apk update --no-cache
WORKDIR /app
COPY --from=dev /app/package.json /app/yarn.lock /app/dist /app/
RUN yarn install --production --frozen-lockfile
RUN chown -R node:node /app
ENV PATH /app/node_modules/.bin:$PATH
USER node
CMD ["node", "dist/main.js"]
