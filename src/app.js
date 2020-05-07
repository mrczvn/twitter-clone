import express, { urlencoded } from 'express';

import './database';

class App {
  constructor() {
    this.app = express();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
  }
}

export default new App().app;
