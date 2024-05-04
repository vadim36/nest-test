import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config'
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    RolesModule,
    AuthModule
  ],
})
export default class AppModule {}