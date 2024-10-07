import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/auth.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { SigninDto } from 'src/modules/auth/dtos/signin.dto';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create.user.dto';
import { PasswordHashPipe } from 'src/pipes/password-hash.pipe';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signup')
  async signup(@Body(PasswordHashPipe<SignupDto>) dto: SignupDto) {
    const createUserDto: CreateUserDto = {
      username: dto.username,
      email: dto.email,
      passwordHash: dto.password,
    };

    return await this.authService.createUser(createUserDto);
  }

  @HttpCode(200)
  @Post('signin')
  async login(@Body() dto: SigninDto) {
    return await this.authService.signin(dto);
  }
}
