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
import { IUserService } from './users.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private usersService: IUserService,
	) {
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

	async register(
		{ body }: Request<{}, {}, UsersRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.createUser(body);

		if (!result) {
			return next(new HTTPError(422, 'Such user is already exist'));
		}

		this.ok(res, { email: result.email });
	}
}
