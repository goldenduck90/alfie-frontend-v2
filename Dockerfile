FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

ARG sendbird_app_id
ENV NEXT_PUBLIC_SENDBIRD_APP_ID=$sendbird_app_id

ARG stripe_publishable_key
ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=$stripe_publishable_key

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