import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({example: 'test@gmail.co', description: 'Email'})
  readonly email: string
  @ApiProperty({example: 'password', description: 'Password'})
  readonly password: string
}