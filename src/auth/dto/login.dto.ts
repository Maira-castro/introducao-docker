import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator'

export class LoginDto {
    @ApiProperty({ description:'Email do usuário.', example: 'mairastefane668@gmail.com' })
    @IsEmail({}, { message: 'email precisa ser válido.' })
    email: string;

    @ApiProperty({description:'Senha do usuário.', example: '123456' })
    @IsString({ message: 'a senha precisa conter letras.' })
    password: string
}