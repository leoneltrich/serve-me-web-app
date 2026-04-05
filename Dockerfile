# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Final stage
FROM node:24-alpine

WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm ci --omit=dev

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Default backend URL (can be overridden at runtime)
ENV BACKEND_API_URL=http://localhost:2000
ENV PUBLIC_API_BASE_URL=/api/v1

EXPOSE 3000

# Command to run the application
CMD ["node", "build"]
