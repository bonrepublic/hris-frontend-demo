FROM node:lts-alpine

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

EXPOSE 3000
