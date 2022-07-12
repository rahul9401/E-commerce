import { ApiProperty } from "@nestjs/swagger";
export class loginDto {
    @ApiProperty()
  username: string;
  @ApiProperty()
  _id: string;
  @ApiProperty()
  roles: string[];
  }