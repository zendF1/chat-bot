import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class UserSecurity {
  @Prop({ type: Date })
  passwordLastChangedAt: Date; // The time the user's password was last changed.

  @Prop({ type: Object })
  twoFA?: User2FA; // The user's two-factor authentication settings.

  @Prop({ type: Number, default: 0 })
  loginAttempts: number; // The number of login attempts made by the user.

  @Prop({ type: Date })
  lastFailedLoginAt: Date; // The time the user's last failed login attempt.

  @Prop({ type: Date })
  accountLockedUntil: Date; // If the account is locked, this is the time the lock expires.
}

@Schema({ _id: false })
export class User2FA {
  @Prop({ type: Boolean, default: false })
  enabled: boolean; // Whether two-factor authentication is enabled for the user.

  @Prop({ type: String })
  method: string; // Method used for 2FA, for example authenticator (authentication application).

  @Prop({ type: String })
  secret: string; // Secret used for 2FA

  @Prop({ type: [String] })
  backupCodes: string[]; // List of backup codes used for 2FA.
}
