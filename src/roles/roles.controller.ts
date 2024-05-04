import { Body, Controller, Get, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import CreateRoleDto from './dto/create-role-dto';
import type { $Enums, Role } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import RoleModel from './role.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  
  @ApiOperation({summary: 'Role creation'})
  @ApiResponse({status: 201, type: RoleModel})
  @Post()
  async createRole(@Body() dto: CreateRoleDto):Promise<Omit<Role, 'roleId'>> {
    return await this.rolesService.createRole(dto)
  }

  @ApiOperation({summary: 'Getting role by value'})
  @ApiResponse({status: 200, type: RoleModel})
  @Get('/:value')
  async getRoleByValue(@Param('value') value: $Enums.Roles):Promise<Role> {
    return await this.rolesService.getRoleByValue(value)
  }
}
