FROM node:18-slim

WORKDIR /app

# Copy package files first for better caching
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY frontend/ .

EXPOSE 5173

CMD ["npm", "run", "dev"]