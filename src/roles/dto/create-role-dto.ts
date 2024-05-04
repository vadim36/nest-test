import { ApiProperty } from "@nestjs/swagger";
import type { $Enums, Role } from "@prisma/client";

export default class CreateRoleDto implements Omit<Role, 'roleId'> {
  @ApiProperty({example: 'Base', description: 'Роль'})
  value: $Enums.Roles;
}