import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePlaceDto } from './dto/update-products.dto';
import { createProductDto } from './dto/create-products.dto';
import { Produtos } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private readonly prismaService: PrismaService) { }

    async createProduct(data: createProductDto): Promise<Produtos> {
        return this.prismaService.produtos.create({ data })
    }

    async getProducts(): Promise<Produtos[]> {
        return this.prismaService.produtos.findMany()
    }

    async productById(id: number): Promise<Produtos | null> {
        return this.prismaService.produtos.findUnique({ where: { id } })
    }

    async putProduct(id: number, data): Promise<Produtos> {
        return this.prismaService.produtos.update({
            where: { id },
            data
        })
    }

    async deleteProduct(id: number): Promise<void> {
        const exist = this.prismaService.produtos.findUnique({ where: { id } })
        if (!exist) throw new NotFoundException('Produto não encontrado')
        await this.prismaService.produtos.delete({ where: { id } })
    }

}
