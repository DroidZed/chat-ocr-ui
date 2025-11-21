# syntax=docker/dockerfile:1

ARG BUN_VERSION=latest

################################################################################
# Build stage
FROM oven/bun:${BUN_VERSION} AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN bun run build

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
