import { NextFunction, Request, Response } from "express";

import { LoggerService } from '../logger/logger.service.js'
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class.js';

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    const statusCode = err instanceof HTTPError ? err.statusCode : 500;
    this.logger.error(err.message);
    res.status(statusCode).send({ err: err.message });
  }
}