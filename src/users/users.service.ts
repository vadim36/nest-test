import { Injectable } from '@nestjs/common';
import PrismaService from 'src/db/prisma.service';
import CreateUserDto from './dto/create-user-dto';
import UserModel from './user.model';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor (
    private prismaService: PrismaService,
    private roleService: RolesService
  ) {}

  async createUser(userDto: CreateUserDto):Promise<UserModel> {
    const baseRole = await this.roleService.getRoleByValue('Base')
    return await this.prismaService.user.create({
      data: {...userDto, roles: { connect: { roleId: baseRole.roleId }}},
      include: {roles: true}
    })
  }

  async getUsers():Promise<UserModel[]> {
    return await this.prismaService.user.findMany({
      include: {roles: true}
    })
  }

  async getUserByEmail(email: string):Promise<UserModel> {
    return await this.prismaService.user.findUnique({
      where: {email},
      include: {roles: true}
    })
  }
}