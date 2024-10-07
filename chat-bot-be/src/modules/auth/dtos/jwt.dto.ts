import { UserEntity } from 'src/modules/user/entities/user.entity';

export class JwtDto {
  id: string;
  username: string;
  email: string;
  role: string;
  accessToken?: string;
  refreshToken?: string;

  toDto() {
    return { ...this };
  }

  static generatePayload(user: UserEntity) {
    const jwtDto = new JwtDto();
    jwtDto.id = user.id;
    jwtDto.username = user.username;
    jwtDto.email = user.email;
    jwtDto.role = user.role;
    return jwtDto.toDto();
  }

  static fromDto(dto: UserEntity, accessToken: string, refreshToken: string) {
    const jwtDto = new JwtDto();
    jwtDto.id = dto.id;
    jwtDto.username = dto.username;
    jwtDto.email = dto.email;
    jwtDto.role = dto.role;
    jwtDto.accessToken = accessToken;
    jwtDto.refreshToken = refreshToken;
    return jwtDto;
  }
}
