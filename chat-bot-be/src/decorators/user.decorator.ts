import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtDto } from 'src/modules/auth/dtos/jwt.dto';

export const User = createParamDecorator(
  (
    data: keyof Pick<JwtDto, 'id' | 'username' | 'email' | 'role'>,
    ctx: ExecutionContext,
  ): JwtDto | string | number | null | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return null;
    }
    return data ? user[data] : user;
  },
);
