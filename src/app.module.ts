import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rahul09:Rahul9090@cluster0.g53m6.mongodb.net/test'),
    UserModule,
    AuthModule,
    CartModule, // Setup the databaseProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
