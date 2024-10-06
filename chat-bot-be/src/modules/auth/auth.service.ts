import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create.user.dto';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const allUser = await this.userService.getAllUser();
    if (allUser.length === 0) {
      return await this.userService.createAdmin(createUserDto);
    } else {
      const userExist = allUser.find(
        (user) => user.username === createUserDto.username,
      );
      if (userExist) {
        throw new BadRequestException('An error occurred');
      }
      return await this.userService.createUserStandard(createUserDto);
    }
  }
}
