# Use lightweight Node.js LTS image
FROM node:lts-buster-slim

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of the bot code
COPY . .

# Set production environment
ENV NODE_ENV=production

# Expose port 3000 (optional)
EXPOSE 3000

# Run the bot
CMD ["npm", "start"]
