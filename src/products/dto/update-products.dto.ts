import { PartialType } from '@nestjs/swagger';
import { createProductDto } from './create-products.dto';

export class UpdateProductDto extends PartialType(createProductDto) {}