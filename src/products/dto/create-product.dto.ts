/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title (unique)',
    nullable: false,
    minLength: 1,
    example: 'Product 1',
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product price',
    nullable: false,
    minimum: 0,
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'Product description',
    nullable: true,
    example: 'Product 1 description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Product slug (unique)',
    nullable: true,
    example: 'product-1',
  })
  @IsString()
  @IsOptional()
  slug: string;

  @ApiProperty({
    description: 'Product stock',
    nullable: true,
    minimum: 0,
    example: 10,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @ApiProperty({
    description: 'Product tags',
    nullable: true,
    example: ['tag1', 'tag2'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Product sizes',
    nullable: true,
    example: ['S', 'M', 'L'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  sizes: string[];

  @ApiProperty({
    description: 'Product gender',
    nullable: true,
    example: 'men',
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product images',
    nullable: true,
    example: ['image1.jpg', 'image2.jpg'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
