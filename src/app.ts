import express, { Express } from "express";
import { Server } from 'http';

import { LoggerService } from './logger/logger.service.js'
import { UsersController } from './users/users.controller.js'

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UsersController;

  constructor(
    logger: LoggerService,
    userController: UsersController
    ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`)
  }
}