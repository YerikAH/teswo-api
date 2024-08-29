/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { Product } from './entities';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input data is invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed: name must be a string.',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. You do not have permission to access this resource.',
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of products with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully.',
    type: [Product],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The query parameters are invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed: page must be a number.',
        error: 'Bad Request',
      },
    },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOperation({ summary: 'Retrieve a single product by ID or name' })
  @ApiResponse({
    status: 200,
    description: 'Product found and returned successfully.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Product not found.',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input data is invalid.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed: price must be a number.',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. You do not have permission to access this resource.',
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Product not found.',
        error: 'Not Found',
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. You do not have permission to access this resource.',
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Product not found.',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
