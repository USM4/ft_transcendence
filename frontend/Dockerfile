FROM node:18-bullseye-slim

WORKDIR /app

# Copy package files first for better caching
# COPY package.json ./
COPY . .

# Install dependencies
# RUN npm i @rollup/rollup-linux-x64-gnu

# Copy project files

EXPOSE 5173

CMD ["./setup.sh"]
# CMD ["sleep", "infinity"]