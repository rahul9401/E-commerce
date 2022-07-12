import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose'; 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rahul09:Rahul9090@cluster0.g53m6.mongodb.net/test'), // Setup the database
    ProductModule, UserModule, AuthModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
