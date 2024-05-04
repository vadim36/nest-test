import { ApiProperty } from "@nestjs/swagger";
import type { User } from "@prisma/client";

export default class UserModel implements User {
  @ApiProperty({example: '1', description: 'Identifier'})
  userId: string;
  @ApiProperty({example: 'test@gmail.co', description: 'Email'})
  email: string;
  @ApiProperty({example: 'password', description: 'Password'})
  password: string;
  @ApiProperty({example: false, description: 'Is user banned'})
  banned: boolean;
  @ApiProperty({example: 'For insults', description: 'Reason for ban'})
  banReason: string;
}