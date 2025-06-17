# client/Dockerfile

# --- Build Stage ---
# This stage builds the React application into static files.
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application for production
# This command creates the static files in a 'dist' folder (for Vite) or 'build' folder (for CRA).
RUN npm run build

# --- Production Stage ---
# This stage serves the built static files using NGINX.
FROM nginx:1.25-alpine

# --- FIX APPLIED HERE ---
# Copy the build output from the 'build' stage to NGINX's web server directory.
# We are copying the contents of the 'dist' directory, which is the standard for Vite projects.
# If you use Create React App, change '/app/dist' to '/app/build'.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom NGINX configuration file
# This file will configure NGINX to serve the React app and proxy API requests.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4000 for the NGINX server
EXPOSE 4000