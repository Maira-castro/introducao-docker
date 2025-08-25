import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { createProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly products: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Retornar os produtos' })
    @ApiOkResponse({ description: 'Produtos retornados com sucesso!' })
    async getProduct() {
        return this.products.getProducts()
    }

    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo produto' })
    @ApiCreatedResponse({description: 'Produto criado com sucesso!' })
    @ApiBadRequestResponse({description:'Erro de validação de dados'})
    @ApiBody({
        description: 'formulário criação de Produto',
        type: createProductDto
    })
    async createProduct(@Body() data: createProductDto) {
        return this.products.createProduct(data)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Consultar um produto pelo ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do produto' })
    @ApiOkResponse({ description: 'Produto retornado com sucesso!' })
    async productById(@Param('id') id: number) {
        return this.products.productById(Number(id))
    }

    @Put(':id')
    @ApiOperation({ summary: 'atualizar um produto' })
    @ApiBadRequestResponse({description:'Erro de validação de dados'})
    @ApiBody({
        description: 'formulário atualização de Produto',
        type: UpdateProductDto
    })
     @ApiResponse({ status: 201, description: 'Produto atualizado com sucesso!' })
    async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
        return this.products.putProduct(Number(id), data)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto' })
    @ApiOkResponse({ description: 'Produto deletado com sucesso!' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do produto' })
    async deleteProduct(@Param('id') id: number) {
        return this.products.deleteProduct(Number(id))
    }
}
