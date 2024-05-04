import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import PrismaService from "./db/prisma.service";

@Module({
  providers: [PrismaService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export default class AppModule {}