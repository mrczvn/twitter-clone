import express, { urlencoded } from 'express';

import './database';
import routes from './routes';
class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.initRoutes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
  }

  initRoutes() {
    return (this.routes = routes(this.app));
  }
}

export default new App().app;
