FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

ENV NEXT_PUBLIC_SENDBIRD_APP_ID 56D883B9-B30F-428B-8B7A-31184E513DF4

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
# USER node

RUN yarn install

COPY . /usr/src/app

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]