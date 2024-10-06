import { Prop, Schema } from '@nestjs/mongoose';
import { Userlanguage, UserTheme } from 'src/shares/constants/user.constant';

@Schema({ _id: false })
export class UserSetting {
  @Prop({ type: String, default: Userlanguage.EN })
  language: Userlanguage; // The language that users use in the system. Defaults to English.

  @Prop({ type: Object })
  notifications: Notifications; // Settings to enable or disable notifications.

  @Prop({ type: String, default: UserTheme.LIGHT })
  theme: UserTheme; // User interface theme, e.g. dark, light. Defaults to light.
}

@Schema({ _id: false })
export class Notifications {
  @Prop({ type: Boolean, default: false })
  email: boolean; // Settings to enable or disable email notifications.

  @Prop({ type: Boolean, default: false })
  sms: boolean; // Settings to enable or disable SMS notifications.

  @Prop({ type: Boolean, default: false })
  push: boolean; // Settings to enable or disable push notifications.
}
