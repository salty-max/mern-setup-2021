import fs from 'fs';
import path from 'path';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { Controller } from './controllers/main.controller';

class App {
  public app: Application;
  private accessLogStream: fs.WriteStream;
  public mainController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.accessLogStream = fs.createWriteStream(
      path.join(__dirname, 'logs', 'access.log'),
      { flags: 'a' }
    );
    this.mainController = new Controller(this.app);
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
    this.app.use(morgan('combined', { stream: this.accessLogStream }));
  }
}

export default new App().app;