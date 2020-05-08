import Sequelize from 'sequelize';
import { join } from 'path';
import { readdirSync } from 'fs';

import dbConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(dbConfig);
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database: ', error);
    }

    this.loadModels().map((obj) =>
      Object.values(obj).map((model) => model.init(this.connection))
    );

    return this.connection;
  }

  loadModels() {
    const dir = join(__dirname, '../models');
    let models = [];
    readdirSync(dir).forEach((file) => {
      const modelPath = require(dir + '/' + file);
      models.push(modelPath);
    });
    return models;
  }
}

export default new Database();
