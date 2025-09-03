import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    //* registrar 
    async createUser(user: RegisterUserDto) {
        const email = await this.prismaService.users.findUnique({ where: { email: user.email } })
        
        if (email) throw new ConflictException('Credenciais inválidas')

        const newUser = await this.prismaService.users.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone
            },
            select: {
                name: true,
                email: true,
                typeUser: true
            }
        })
        
        return newUser
    }

    //* retornar
    async getUsers() {
        return await this.prismaService.users.findMany({
            omit: { password: true }
        })
    }

    //* retornar usuario por email
    async userByEmail(email: string) {
        const user = await this.prismaService.users.findUnique({ where: { email }, omit: { password: true } })
        if (!user) throw new NotFoundException('usuario não encontrado')
        return user
    }

    async putUser(id: string, newdata: UpdateUserDto) {
        const user = await this.prismaService.users.findUnique({ where: { id } })
        if (!user) throw new NotFoundException('usuario não encontrado')
        return await this.prismaService.users.update({
            where: { id },
            data: {
                name: newdata.name,
                email: newdata.email,
                phone: newdata.phone,
                password: newdata.password
            },
            omit: { password: true }
        })
    }

    async deleteUser(id: string): Promise<Users> {
        const user = await this.prismaService.users.findUnique({ where: { id } })
        if (!user) throw new NotFoundException('usuario não encontrado')
        return await this.prismaService.users.delete({ where: { id } })
    }
}
