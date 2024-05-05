import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import CreateUserDto from './dto/create-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserModel from './user.model';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Users')
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
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  async getUsers():Promise<UserModel[]> {
    return await this.usersService.getUsers()
  }

  @ApiOperation({summary: 'Get user by email'})
  @ApiResponse({status: 200, type: UserModel})
  @Get('/:email')
  async getUserByEmail(@Param() email: string):Promise<UserModel> {
    return await this.usersService.getUserByEmail(email)
  }
}