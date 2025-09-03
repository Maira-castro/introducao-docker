import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwt: JwtService) { }

    //* Registra um novo usuário (CLIENTE)
    async Register(dto: RegisterUserDto) {

        const userExists = await this.prismaService.users.findUnique({ where: { email: dto.email } })
        if (userExists) throw new ConflictException('Credenciais inválidas')
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        if (!hashedPassword) throw new UnauthorizedException('Credenciais inválidas')

        const user = await this.prismaService.users.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                password: hashedPassword
            },
            select: {
                name: true,
                email: true,
                phone: true,
                typeUser: true
            }
        })
        return user
    }

    //* Registra um novo usuario (ADMIN)
    async RegisterAdmin(dto: RegisterUserDto) {

        //verificando se já existe usuario com aquele email
        const userExists = await this.prismaService.users.findUnique({ where: { email: dto.email } })
        if (userExists) throw new ConflictException('Credenciais inválidas')

        //criptografando a senha
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        if (!hashedPassword) throw new UnauthorizedException('Credenciais inválidas')

        //*criando usuario
        const user = await this.prismaService.users.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                password: hashedPassword, //a senha criptografada
                typeUser: 'ADMINISTRADOR'
            },
            select: {
                name: true,
                email: true,
                phone: true,
                typeUser: true
            }
        })
        return user
    }

    //* Validação de usuario
    async validateUser(email: string, password: string) {
        //verifica se tem algum usuario com aquele email
        const user = await this.prismaService.users.findUnique({ where: { email } })
        if (!user) throw new UnauthorizedException('Credenciais inválidas!')

        //se o usuario possuir o email salvo mas não tiver senha
        if (!user.password) throw new UnauthorizedException('Informe uma senha')

        //verifica a senha que o usuario passou
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas')

            
        //retorna o usuario encontrado
        return user
    }

    async login(credentials: LoginDto) { //função para logar usuario

        //recebe o usuario que esta sendo logado que vem do metodo validateUser() que verifica se email e senha esta certo
        const user = await this.validateUser(credentials.email, credentials.password);

        const payload = { // define o que vai ser retornado no token 
            sub: user.id, //id dele
            typeUser: user.typeUser, //tipo de usuario
            email: user.email, //email
        };

        return {
            access_token: this.jwt.sign(payload), //cria e retorna o token
        };
    }
    

}
