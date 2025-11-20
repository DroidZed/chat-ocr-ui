# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.15.1

################################################################################
# Build stage
FROM node:${NODE_VERSION}-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

################################################################################
# Production stage
FROM nginx:alpine AS final

# Copy built assets from build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy nginx configuration for React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
