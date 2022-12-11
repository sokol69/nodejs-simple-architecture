import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UsersRegisterDto } from './dto/users.register.dto';
import { UsersLoginDto } from './dto/users.login.dto';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		const routes: IControllerRoute[] = [
			{
				method: 'post',
				path: '/login',
				func: this.login,
			},
			{
				method: 'post',
				path: '/register',
				func: this.register,
			},
		];

		this.bindRoutes(routes);
	}

	login(req: Request<{}, {}, UsersLoginDto>, res: Response, next: NextFunction) {
		console.log(req.body);
		next(new HTTPError(401, 'Unauthorized'));
	}

	register(req: Request<{}, {}, UsersRegisterDto>, res: Response, next: NextFunction) {
		console.log(req.body);
		this.ok(res, 'register');
	}
}
