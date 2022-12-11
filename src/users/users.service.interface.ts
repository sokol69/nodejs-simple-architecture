import { UsersLoginDto } from './dto/users.login.dto';
import { UsersRegisterDto } from './dto/users.register.dto';
import { User } from './users.entity';

export interface IUserService {
	createUser: (dto: UsersRegisterDto) => Promise<User | null>;
	validateUser: (dto: UsersLoginDto) => Promise<boolean>;
}
