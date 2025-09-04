import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UpdateUserDto } from 'src/auth/dto/update-user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prismaService: PrismaService) { }
    
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
