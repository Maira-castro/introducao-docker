import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

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
}
