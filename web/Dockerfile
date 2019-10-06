FROM nginx:1.17.4-alpine

WORKDIR /etc/nginx/conf.d

RUN rm -rf ./*;

COPY map.conf proxy.conf site.template ./
COPY nginx.conf ../

RUN nginx -t;

