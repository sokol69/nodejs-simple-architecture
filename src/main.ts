import { Container } from 'inversify';

import { App } from "./app.js"
import { LoggerService } from './logger/logger.service.js'
import { UsersController } from './users/users.controller.js'
import { ExceptionFilter } from './errors/exception.filter.js'
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types.js';

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();

export { appContainer, app };