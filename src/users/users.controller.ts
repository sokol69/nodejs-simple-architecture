import { Request, Response, NextFunction } from "express";

import { BaseController } from "../common/base.controller.js";
import { IControllerRoute } from "../common/route.interface";
import { HTTPError } from "../errors/http-error.class.js";
import { LoggerService } from '../logger/logger.service.js'

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    const routes: IControllerRoute[] = [
      {
        method: 'post',
        path: '/login',
        func: this.login
      },
      {
        method: 'post',
        path: '/register',
        func: this.register
      }
    ]

    this.bindRoutes(routes);
  }

  login(req: Request, res: Response) {
    throw new HTTPError(401, 'Unauthorized');
  }

  register(req: Request, res: Response) {
    this.ok(res, 'register');
  }
}