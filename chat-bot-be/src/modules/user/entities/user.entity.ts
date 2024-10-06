import { Prop, Schema } from '@nestjs/mongoose';
import { UserProfile } from 'src/modules/user/entities/user.profile.entity';
import { UserSecurity } from 'src/modules/user/entities/user.secirity.entity';
import { UserSetting } from 'src/modules/user/entities/user.setting.entity';
import { UserToken } from 'src/modules/user/entities/user.token.entity';
import { UserRoles, UserStatus } from 'src/shares/constants/user.constant';
import { BaseEntity } from 'src/shares/entities/base.entity';

@Schema()
export class UserEntity extends BaseEntity {
  @Prop({ type: String, required: true })
  username: string; // Username to log into the system.

  @Prop({ type: String, required: true })
  email: string; // User's email address.

  @Prop({ type: String, required: true })
  passwordHash: string; // The hash of the password, saved in a secure encrypted form.

  @Prop({ type: String, required: true })
  role: UserRoles; // List of user roles, for example user, admin.

  @Prop({ type: String })
  lastLoginAt?: Date; // User's last login time.

  @Prop({ type: String, default: UserStatus.ACTIVE })
  status: UserStatus; // Account status can be active, inactive, or suspended. Default is active.

  @Prop({ type: Object })
  profile?: UserProfile; // User's profile information.

  @Prop({ type: Object })
  setting: UserSetting; // User's setting information.

  @Prop({ type: Object })
  security?: UserSecurity; // User's security information.

  @Prop({ type: Object })
  token?: UserToken; // User's token
}
