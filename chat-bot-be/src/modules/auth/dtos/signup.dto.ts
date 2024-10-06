import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'username',
    default: 'admin',
  })
  username: string; // unique

  @ApiProperty({
    required: true,
    type: String,
    description: 'email',
    default: 'chuongnguyen417@gmail.com',
  })
  email: string; // unique

  @ApiProperty({
    required: true,
    type: String,
    description: 'password',
    default: '123456Aa@',
  })
  password: string;
}
