import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'username',
    default: 'admin',
  })
  username: string;
  @ApiProperty({
    required: true,
    type: String,
    description: 'password',
    default: '123456Aa@',
  })
  password: string;
}
