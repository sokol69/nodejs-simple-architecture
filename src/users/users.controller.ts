import { Request, Response, NextFunction } from "express";

import { BaseController } from "../common/base.controller.js";
import { IControllerRoute } from "../common/route.interface";
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

    this.bindRoutes(routes)
  }

  login(req: Request, res: Response) {
    this.ok(res, 'login')
  }

  register(req: Request, res: Response) {
    this.ok(res, 'register')
  }
}