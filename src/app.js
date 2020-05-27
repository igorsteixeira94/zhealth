import express from 'express';
import 'express-async-errors';
import routes from './routes/routes';
import 'dotenv/config';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
