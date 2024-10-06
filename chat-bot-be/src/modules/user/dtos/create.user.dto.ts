import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserRoles } from 'src/shares/constants/user.constant';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'username',
  'passwordHash',
]) {
  role?: UserRoles;
  constructor(data: Partial<CreateUserDto>) {
    super();
    Object.assign(this, data);
  }
}
