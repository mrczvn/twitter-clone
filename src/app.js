import express, { urlencoded } from 'express';

import './database';
import routes from './routes';
import authorization from './middleware/auth';
class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.initRoutes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
    this.auth = authorization();
    this.app.use(this.auth.initialize());
  }

  initRoutes() {
    return (this.routes = routes(this.app, this.auth));
  }
}

export default new App().app;
