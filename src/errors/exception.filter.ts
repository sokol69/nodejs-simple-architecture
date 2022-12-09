import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import { ILogger } from '../logger/logger.interface';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		const statusCode = err instanceof HTTPError ? err.statusCode : 500;
		this.logger.error(err.message);
		res.status(statusCode).send({ err: err.message });
	}
}
