import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/shares/constants/user.constant';

export const ROLE_KEY = 'roles';
export const Role = (...role: [UserRoles]) => SetMetadata(ROLE_KEY, role);
