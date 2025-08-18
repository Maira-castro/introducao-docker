import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class createProductDto {
    @ApiProperty({ description: 'nome do produto', example: 'Televisão' })
    @IsString({message:'Nome deve ser uma String'})
    name: string

    @ApiProperty({ description: 'preço do produto', example: 8.5 })
    @IsNumber()
    price: number

    @ApiProperty({ description: 'quantidade do produto em estoque', example: 7 })
    @IsNumber()
    qtd: number

    @ApiProperty({ description: 'marca do produto', example: 'philco' })
    @IsString({message:'Nome deve ser uma String'})
    brand: string

    @ApiProperty({ description: 'categoria do produto', example: 'eletro' })
    @IsString({message:'Nome deve ser uma String'})
    category?: string
}