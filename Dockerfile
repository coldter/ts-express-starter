ARG NODE_VERSION=19.8
ARG PORT=3000
# base image
FROM node:$NODE_VERSION-alpine as base
# labels 
LABEL maintainer="Kuldeep <kuldeep@onelint.com>" \
  version="0.1" \
  description="A lgihtwaight container for the node api server"

# install dependencies as dependencies image
FROM base as dependencies

WORKDIR /app
COPY package*.json ./
# run clean install
RUN npm ci

# build the app source code 
FROM dependencies as build
COPY . .
RUN npm run build

# release image
FROM base as release

# environment variables every other environment variable will be taken from Env files
ENV NODE_ENV=production 
ENV PORT=$PORT

WORKDIR /app
# copy the build files and required libraries and run the app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/*.env ./

# expose the port
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dist" ]