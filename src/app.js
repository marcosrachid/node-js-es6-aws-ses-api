'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
import routes from './routes';

const app = express();
const configureExpress = () => {
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(multiparty());
  // filter always before routers
  app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
  });
  // routers
  app.use('/', routes);

  return app;
};


export default async () => {
  return configureExpress();
};
