import { Injectable } from '@nestjs/common';
import PrismaService from 'src/db/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User, Role } from '@prisma/client';
import { RolesService } from 'src/roles/roles.service';
import { IUser } from 'src/auth/create-user-payload';

@Injectable()
export class UsersService {
  constructor (
    private prisma: PrismaService,
    private roleService: RolesService
  ) {}
  
  async createUser(dto: CreateUserDto):Promise<IUser> {
    const baseRole = await this.roleService.getRoleByValue('Base')
    return await this.prisma.user.create({
      data: {...dto},
      include: { roles: true }
    })
  }
  
  async getAllUsers():Promise<User[]> {
    return await this.prisma.user.findMany({
      include: { roles: { select: { value: true } } }
    })
  }

  async getUserByEmail(email: string):Promise<IUser> {
    return await this.prisma.user.findUnique({
      where: {email},
      include: { roles: true }
    })
  }
}