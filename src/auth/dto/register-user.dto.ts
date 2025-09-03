import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterUserDto {
    @ApiProperty({
        example:"Maira Stefane"
    })
    @IsString({ message: "Nome deve ter no minimo 8 caracteres" })
    name: string

     @ApiProperty({
        example:"mairastefane668@gmail.com"
    })
    @IsEmail({}, { message: 'Informe um e-mail válido.' })
    email: string

     @ApiProperty({
        example:"40028922"
    })
    @IsString()
    phone: string

     @ApiProperty({
        example:"123456"
    })
    @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres.' })
    password: string
}