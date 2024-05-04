import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@ApiTags('Authtorization')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({summary: 'User registration'})
  @ApiResponse({status: 201, type: 'token'})
  @Post('/registration')
  async registration(@Body() dto: CreateUserDto):Promise<string> {
    return await this.authService.registration(dto)
  }

  @ApiOperation({summary: 'User login'})
  @ApiResponse({status: 201, type: 'token'})
  @Post('/login')
  async login(@Body() dto: CreateUserDto):Promise<string> {
    return await this.authService.login(dto)
  }
}