FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

# RUN mkdir -p /etc/nginx/ssl && \
#     openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
#     -keyout /etc/nginx/ssl/nginx.key \
#     -out /etc/nginx/ssl/nginx.crt \
#     -subj "/CN=localhost"
COPY ssl/nginx.crt /etc/nginx/ssl/nginx.crt

COPY ssl/nginx.key /etc/nginx/ssl/nginx.key

RUN chmod 644 /etc/nginx/ssl/nginx.crt

RUN  chmod 644 /etc/nginx/ssl/nginx.key

CMD ["nginx", "-g", "daemon off;"]