import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import type { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserModel from './user.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (private userService: UsersService) {}
  
  @ApiOperation({summary: 'User creation'})
  @ApiResponse({status: 201, type: UserModel})
  @Post()
  async createUser(@Body() dto: CreateUserDto):Promise<User> {
    return this.userService.createUser(dto)
  }

  @ApiOperation({summary: 'Getting users'})
  @ApiResponse({status: 200, type: [UserModel]})
  @Get()
  async getUsers():Promise<User[]> {
    return this.userService.getAllUsers()
  }
}