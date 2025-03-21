FROM node:20.12.2-bookworm-slim 

# Update package lists and install required tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    tar \
    gzip \
    git \
    ca-certificates \
    && npm install -g pnpm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create the /app directory and set ownership to the existing 'node' user and group
RUN mkdir -p /app \
    && chown -R node:node /app

# Switch to the 'node' user
USER node

# Set the working directory to /app
WORKDIR /app

# Set environment variable for the host
ENV HOST=0.0.0.0

# Expose necessary ports
EXPOSE 4321