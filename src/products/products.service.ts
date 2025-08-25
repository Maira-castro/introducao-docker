import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-products.dto';
import { createProductDto } from './dto/create-products.dto';
import { Produtos } from '@prisma/client';
import { error } from 'console';

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
        const product = this.prismaService.produtos.findUnique({ where: { id } })
        if (!product) {
            throw new NotFoundException('ID não encontrado!')
        }
        return product
    }

    async putProduct(id: number, data): Promise<Produtos> {
        return this.prismaService.produtos.update({
            where: { id },
            data
        })
    }

    async deleteProduct(id: number): Promise<Produtos> {
        const exist = this.prismaService.produtos.findUnique({ where: { id } })
        if (!exist) throw new NotFoundException('Produto não encontrado')
        const deleteProduct = await this.prismaService.produtos.delete({ where: { id } })
        return deleteProduct
    }

}
