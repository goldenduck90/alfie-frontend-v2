FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

ENV REACT_APP_GRAPHQL_API http://localhost:4000/graphql
ENV NEXT_PUBLIC_SENDBIRD_APP_ID 56D883B9-B30F-428B-8B7A-31184E513DF4
STRIPE_SECRET_KEY=sk_test_51K4tkPDOjl0X0gOqWcyjvCHlkdptYesL7ftuKxd9luFemEWGzxRX1SUbCmcJvknVeg5Le5zGSdW4Oivj3YdgeWq400xp2gTQJ7
ENV REACT_APP_STRIPE_URL https://api.stripe.com/v1
ENV GENERATE_SOURCEMAP false


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