import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateUserDto from './dto/create-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserModel from './user.model';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService) {}

  @ApiOperation({summary: 'Creation user'})
  @ApiResponse({status: 201, type: UserModel})
  @Post()
  async createUser(@Body() userDto: CreateUserDto):Promise<UserModel> {
    return await this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: 'Getting all the users'})
  @ApiResponse({status: 200, type: [UserModel]})
  @Get()
  async getUsers():Promise<UserModel[]> {
    return await this.usersService.getUsers()
  }
}