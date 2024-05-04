import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import PrismaService from 'src/db/prisma.service';
import { RolesService } from 'src/roles/roles.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    PrismaService,
    RolesService
  ],
  exports: [UsersService]
})
export class UsersModule {}
