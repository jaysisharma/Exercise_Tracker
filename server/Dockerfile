# --- Base Stage ---
# Use an official Node.js runtime as a parent image.
# Using a specific version ensures consistency.
FROM node:18-alpine AS base

# Set the working directory in the container.
WORKDIR /usr/src/app

# --- Dependencies Stage ---
# Copy package.json and package-lock.json to leverage Docker layer caching.
# This layer is only rebuilt when dependencies change.
FROM base AS dependencies
COPY package*.json ./
# Install app dependencies
RUN npm install

# --- Production Stage ---
# Copy installed dependencies from the 'dependencies' stage.
FROM base AS production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Bundle app source
COPY . .

# Your app binds to port 5000, so we'll expose that.
EXPOSE 5000

# Define the command to run your app.
CMD [ "node", "server.js" ]
