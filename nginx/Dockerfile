FROM nginx:latest

RUN apt update 
RUN apt install gettext-base

COPY default.conf /etc/nginx/conf.d/default.conf
COPY ./generate_ssl.sh .

RUN chmod +x generate_ssl.sh

CMD ["./generate_ssl.sh"]