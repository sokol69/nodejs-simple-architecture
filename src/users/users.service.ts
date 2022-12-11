import { injectable } from 'inversify';

import { UsersLoginDto } from './dto/users.login.dto';
import { UsersRegisterDto } from './dto/users.register.dto';
import { User } from './users.entity';
import { IUserService } from './users.service.interface';
import 'reflect-metadata';

@injectable()
export class UsersService implements IUserService {
	async createUser({ email, name, password }: UsersRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: UsersLoginDto): Promise<boolean> {
		return true;
	}
}
