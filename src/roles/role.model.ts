import { ApiProperty } from "@nestjs/swagger";
import type { $Enums, Role } from "@prisma/client";

export default class RoleModel implements Role {
  @ApiProperty({example: 'uuid', description: 'Идентификатор роли'})
  roleId: string;
  @ApiProperty({example: 'Base', description: 'Роль'})
  value: $Enums.Roles;
}