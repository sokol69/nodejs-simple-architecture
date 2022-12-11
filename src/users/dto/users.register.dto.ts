import { IsEmail, IsString } from 'class-validator';

export class UsersRegisterDto {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Required' })
	password: string;

	@IsString({ message: 'Required' })
	name: string;
}
