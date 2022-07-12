import { ApiProperty } from "@nestjs/swagger";

export class ItemDTO {
  
  @ApiProperty()  
  productId: string;
  
  @ApiProperty()  
  name: string;
  
  @ApiProperty()  
  quantity: number;
  
  @ApiProperty()  
  price: number;
  
}