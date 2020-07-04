FROM node:lts

WORKDIR /usr/src/server

COPY . .

RUN npm install

CMD [ "/bin/bash" ]