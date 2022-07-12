import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('store/product')
@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @ApiOperation({ summary: 'get product' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'invalid request' })
  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @ApiOperation({ summary: 'get product by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'invalid input' })
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @ApiOperation({ summary: 'add product ' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: "can't add product" })
  @Post('/')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @ApiOperation({ summary: 'update product by id ' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: "can't update product" })
  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @ApiOperation({ summary: 'delete product by id ' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: "can't delete product" })
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}