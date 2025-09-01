# React application
FROM node:24-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5002

# Start the application
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0"]