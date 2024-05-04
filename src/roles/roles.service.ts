import { Injectable } from '@nestjs/common';
import PrismaService from 'src/db/prisma.service';
import CreateRoleDto from './dto/create-role-dto';
import { $Enums, Role } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor (private prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto):Promise<Omit<Role, 'roleId'>> {
    return await this.prisma.role.create({
      data: {...dto},
      select: { value: true}
    })
  }

  async getRoleByValue(value: $Enums.Roles):Promise<Role> {
    return await this.prisma.role.findUnique({
      where: {value}
    })
  }
}