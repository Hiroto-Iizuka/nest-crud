FROM node:16.13.1-alpine
WORKDIR /api
COPY ./ /api
RUN npm i -g @nestjs/cli@8.2.8
CMD ["npm", "run", "start:dev"]