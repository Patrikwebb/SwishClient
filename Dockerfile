FROM node:4.5.0

WORKDIR /usr/src
VOLUME /usr/scr
COPY package.json /usr/src/
COPY upload/cacertTest.pem /usr/share/ca-certificates/extra/cacertTest.pem
RUN echo "extra/cacertTest.pem" >> /etc/ca-certificates.conf
RUN update-ca-certificates
RUN npm install
COPY / /usr/src/
EXPOSE 3000 3001
CMD [ "npm" , "start" ]
