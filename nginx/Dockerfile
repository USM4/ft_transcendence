FROM nginx:latest

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Copy SSL certificates (if you have pre-generated them)
COPY ssl/nginx.crt /etc/nginx/ssl/nginx.crt
COPY ssl/nginx.key /etc/nginx/ssl/nginx.key

# Copy nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chmod 644 /etc/nginx/ssl/nginx.crt
RUN chmod 600 /etc/nginx/ssl/nginx.key

# Expose ports
EXPOSE 80 443