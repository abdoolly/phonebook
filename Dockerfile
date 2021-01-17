From node:12.13.0 as build
WORKDIR /usr/src
COPY package.json .
RUN npm install
COPY . .

From node:12.13.0 as test
WORKDIR /usr/src
COPY --from=build /usr/src .
CMD npm test

From node:12.13.0 as run
WORKDIR /usr/src
COPY --from=build /usr/src .
CMD npm run prod