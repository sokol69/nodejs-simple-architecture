import express, { Express } from "express";
import { Server } from 'http';

import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller.js';
import { ExceptionFilter } from './errors/exception.filter.js';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILogger;
  userController: UsersController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: ILogger,
    userController: UsersController,
    exceptionFilter: ExceptionFilter
    ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilter() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilter();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`)
  }
}