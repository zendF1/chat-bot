import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from 'src/modules/auth/dtos/jwt.dto';
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

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.userRepository.getUserByUsername(username);
  }

  async createAdmin(userDto: CreateUserDto): Promise<JwtDto> {
    userDto.role = UserRoles.ADMIN;
    return await this.createUser(userDto);
  }

  async createUserStandard(userDto: CreateUserDto): Promise<JwtDto> {
    userDto.role = UserRoles.USER;
    return await this.createUser(userDto);
  }

  async updateLastLogin(userId: string) {
    return await this.userRepository.updateUser(userId, {
      lastLoginAt: new Date(),
    });
  }

  async updateUserRefreshToken(userId: string, refreshToken: string) {
    return await this.userRepository.updateUser(userId, {
      token: {
        type: UserTokenType.REFRESH,
        token: refreshToken,
        expiresAt: new Date(
          new Date().getTime() + SharedUtils.daysToMilliseconds(30),
        ),
      },
    });
  }

  private async updateUser(userId: string, dto: Partial<UserEntity>) {
    return this.userRepository.updateUser(userId, dto);
  }

  private async createUser(userDto: CreateUserDto): Promise<JwtDto> {
    const user = await this.userRepository.createrUser(userDto);
    if (user) {
      this.userHistoryLogRepository.create({
        userId: user.id,
        action: 'create',
        timestamp: new Date(),
        changes: user,
      });
    }
    const payload = JwtDto.generatePayload(user);

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    await this.userRepository.updateUser(user.id, {
      token: {
        type: UserTokenType.REFRESH,
        token: refreshToken,
        expiresAt: new Date(
          new Date().getTime() + SharedUtils.daysToMilliseconds(30),
        ),
      },
    });

    return JwtDto.fromDto(user, accessToken, refreshToken);
  }
}
