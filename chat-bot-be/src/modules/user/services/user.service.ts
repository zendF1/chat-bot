import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/create.user.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserHistoryLogRepository } from 'src/modules/user/repositories/user.hisroryLog.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserRoles, UserTokenType } from 'src/shares/constants/user.constant';
import { SharedUtils } from 'src/shares/utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userHistoryLogRepository: UserHistoryLogRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.getAllUser();
  }
  async getUser(userId: string): Promise<UserEntity | null> {
    return await this.userRepository.getUser(userId);
  }

  async createAdmin(userDto: CreateUserDto): Promise<string> {
    userDto.role = UserRoles.ADMIN;
    return await this.createUser(userDto);
  }

  async createUserStandard(userDto: CreateUserDto): Promise<string> {
    userDto.role = UserRoles.USER;
    return await this.createUser(userDto);
  }

  private async createUser(userDto: CreateUserDto): Promise<string> {
    const user = await this.userRepository.createrUser(userDto);
    if (user) {
      this.userHistoryLogRepository.create({
        userId: user.id,
        action: 'create',
        timestamp: new Date(),
        changes: user,
      });
    }
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        role: user.role,
      },
      {
        expiresIn: '30m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        role: user.role,
      },
      {
        expiresIn: '30d',
      },
    );

    await this.userRepository.updateUser(user.id, {
      token: {
        type: UserTokenType.REFRESH,
        token: refreshToken,
        expiresAt: new Date(
          new Date().getTime() + SharedUtils.daysToMilliseconds(30),
        ),
      },
    });

    return accessToken;
  }
}
