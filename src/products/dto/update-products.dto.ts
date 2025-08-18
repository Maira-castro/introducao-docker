import { PartialType } from '@nestjs/swagger';
import { createProductDto } from './create-products.dto';

export class UpdatePlaceDto extends PartialType(createProductDto) {}