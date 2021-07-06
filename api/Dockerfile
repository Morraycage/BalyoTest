# base image
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
ADD package*.json ./

RUN npm install

# Bundle app source
ADD . .

CMD [ "npm", "run", "dev"]
