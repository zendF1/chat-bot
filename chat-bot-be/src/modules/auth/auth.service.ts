import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorators/auth.decorator';
import { JwtDto } from 'src/modules/auth/dtos/jwt.dto';
import { SigninDto } from 'src/modules/auth/dtos/signin.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create.user.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UserTokenType } from 'src/shares/constants/user.constant';
import { HashingService } from 'src/shares/services/hashing.service';

@Public()
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
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

  async signin(dto: SigninDto) {
    const user = await this.userService.getUserByUsername(dto.username);
    if (
      user &&
      (await this.hashingService.comparePasswords(
        dto.password,
        user.passwordHash,
      ))
    ) {
      const payload = JwtDto.generatePayload(user);
      const accessToken = await this.generateAccessToken(payload);
      const refreshToken =
        user.token?.type === UserTokenType.REFRESH &&
        user.token?.expiresAt > new Date()
          ? user.token.token
          : await this.generateRefreshToken(payload);
      this.userService.updateLastLogin(user.id);
      return JwtDto.fromDto(user, accessToken, refreshToken);
    } else {
      throw new BadRequestException('An error occurred');
    }
  }

  async getAccessTokenByRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.getUser(userId);
    if (user && user.token?.token === refreshToken) {
      const payload = JwtDto.generatePayload(user);
      const accessToken = await this.generateAccessToken(payload);
      return accessToken;
    }
    throw new BadRequestException('An error occurred');
  }

  async resetRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.getUser(userId);
    if (user && user.token?.token === refreshToken) {
      const payload = JwtDto.generatePayload(user);
      const refreshToken = await this.generateRefreshToken(payload);
      await this.userService.updateUserRefreshToken(userId, refreshToken);
      return refreshToken;
    }
    throw new BadRequestException('An error occurred');
  }

  private async generateAccessToken(payload: any): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
    });
    return accessToken;
  }

  private async generateRefreshToken(payload: any): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });
    return refreshToken;
  }
}
