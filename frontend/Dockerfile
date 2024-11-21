# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app-frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app-frontend/
COPY src/ /app-frontend/src/
COPY public/ /app-frontend/public/

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container

# Expose the port your app runs on
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]


