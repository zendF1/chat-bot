import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/services/user.service';

@Controller('user')
@ApiTags('user')
// @UseGuards(RoleGuard)
// @Role(UserRoles.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getUser() {
    return await this.userService.getAllUser();
  }
}
