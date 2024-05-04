import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import CreateUserPayload from './create-user-payload';
import { IUser } from './create-user-payload';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor (
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async registration(dto: CreateUserDto):Promise<string> {
    const candidate = await this.userService.getUserByEmail(dto.email)
    if (candidate) {
      throw new HttpException('Such user already exist', HttpStatus.BAD_REQUEST)
    }
    
    const hashPassword = await bcrypt.hash(dto.password, 4)
    const user = await this.userService.createUser({
      ...dto, password: hashPassword
    })
    return await this.generateToken(user)
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto)
    return this.generateToken(user)
  }

  private generateToken(model: IUser):string {
    const payload = new CreateUserPayload(model)
    return this.jwtService.sign({...payload})
  }

  private async validateUser(userDto: CreateUserDto):Promise<IUser> {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    const isPasswordEquals = await bcrypt.compare(userDto.password, candidate.password)
    if (!candidate || !isPasswordEquals) {
      throw new UnauthorizedException('Incorrect email or password')
    }

    return candidate
  }
}