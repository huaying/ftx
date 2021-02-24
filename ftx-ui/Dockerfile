FROM node:15-slim
RUN mkdir -p /ui
WORKDIR /ui
COPY ./ /ui
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /ui && cp -a /tmp/node_modules /ui/
RUN cd /ui/ && npm run build

RUN mkdir -p /var/log/ui
RUN ./node_modules/pm2/bin/pm2 install pm2-logrotate;
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:max_size 10M

ENV NODE_ENV=production NODE_PATH=./lib:.

EXPOSE 80
CMD ./node_modules/pm2/bin/pm2 start ecosystem.config.js