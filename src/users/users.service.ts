import { inject, injectable } from 'inversify';

import { UsersLoginDto } from './dto/users.login.dto';
import { UsersRegisterDto } from './dto/users.register.dto';
import { User } from './users.entity';
import { IUserService } from './users.service.interface';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UsersRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get<number>('SALT');
		console.log(salt);
		newUser.setPassword(password, salt);
		return null;
	}

	async validateUser(dto: UsersLoginDto): Promise<boolean> {
		return true;
	}
}
