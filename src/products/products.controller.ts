import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { createProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { AdminGuard } from '../auth/admin.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly products: ProductsService) { }


    @Get()
    @ApiOperation({ summary: 'Retornar os produtos' })
    @ApiOkResponse({ description: 'Produtos retornados com sucesso!' })
    async getProduct() {
        return this.products.getProducts()
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo produto' })
    @ApiCreatedResponse({ description: 'Produto criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Erro de validação de dados' })
    @ApiBody({
        description: 'formulário criação de Produto',
        type: createProductDto
    })
    async createProduct(@Body() data: createProductDto) {
        return this.products.createProduct(data)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ summary: 'Consultar um produto pelo ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do produto' })
    @ApiOkResponse({ description: 'Produto retornado com sucesso!' })
    async productById(@Param('id') id: number) {
        return this.products.productById(Number(id))
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('buscar-por-nome/:name')
    @ApiOperation({ summary: 'Retorna um produto por nome' })
    @ApiParam({ name: 'name', type: String, description: 'Nome do produto que deseja buscar' })
    @ApiResponse({ status: 200, description: 'Produto encontrado' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    async productByName(@Param('name') name: string) {
        return this.products.getProductByName(name);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'atualizar um produto' })
    @ApiBadRequestResponse({ description: 'Erro de validação de dados' })
    @ApiBody({
        description: 'formulário atualização de Produto',
        type: UpdateProductDto
    })
    @ApiResponse({ status: 201, description: 'Produto atualizado com sucesso!' })
    async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
        return this.products.putProduct(Number(id), data)
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto' })
    @ApiOkResponse({ description: 'Produto deletado com sucesso!' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do produto' })
    async deleteProduct(@Param('id') id: number) {
        return this.products.deleteProduct(Number(id))
    }
}
