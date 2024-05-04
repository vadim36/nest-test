import { ApiProperty } from "@nestjs/swagger"

export default class CreateUserDto {
  @ApiProperty({description: 'Email', example: 'test@gmail.com'})
  email: string
  @ApiProperty({description: 'Password', example: 'Password'})
  password: string
}