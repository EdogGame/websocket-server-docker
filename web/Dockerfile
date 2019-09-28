FROM nginx

WORKDIR /etc/nginx/conf.d

RUN rm -rf ./*;

COPY nginx.conf ../
COPY proxy.conf ./

RUN nginx -t;

