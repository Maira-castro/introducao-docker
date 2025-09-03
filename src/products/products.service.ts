import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
        const product = await this.prismaService.produtos.findUnique({ where: { id } })
        if (!product) {
            throw new NotFoundException('ID não encontrado!')
        }
        return product
    }

    async getProductByName(name: string) {
        const product = await this.prismaService.produtos.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        });

        if (product.length === 0) throw new NotFoundException(
            `Nenhum produto com nome contendo '${name}' foi encontrado`,
        );

        return product;
    }

    async putProduct(id: number, data): Promise<Produtos> {
        const product = await this.prismaService.produtos.findUnique({ where: { id } })
        if (!product) {
            throw new NotFoundException('ID não encontrado!')
        }
        return this.prismaService.produtos.update({
            where: { id },
            data
        })
    }

    async deleteProduct(id: number): Promise<Produtos> {
        const exist = await this.prismaService.produtos.findUnique({ where: { id } })
        if (!exist) throw new NotFoundException('Produto não encontrado')
        const deleteProduct = await this.prismaService.produtos.delete({ where: { id } })
        return deleteProduct
    }


}
