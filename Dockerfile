FROM node:9.6.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.1

EXPOSE 4201:4200

COPY . /usr/src/app
CMD ng serve --open --host 0.0.0.0