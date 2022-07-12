import { Controller, Post, Body, Request, UseGuards, Delete, NotFoundException, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CartService } from './cart.service';
import { ItemDTO } from './dtos/item.dto';

@ApiTags("Cart")
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) { }

  @ApiOperation({ summary: 'add item to cart' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'can not add to cart' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('/')
  async addItemToCart(@Request() req, @Body() itemDTO: ItemDTO) {
    const userId = req.user.userId;
    const cart = await this.cartService.addItemToCart(userId, itemDTO);
    return cart;
  }

  @ApiOperation({ summary: 'remove from for cart' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'can not remove item from cart' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/')
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    const userId = req.user.userId;
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }

  @ApiOperation({ summary: 'delete from cart via id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'can not delete item from cart' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}