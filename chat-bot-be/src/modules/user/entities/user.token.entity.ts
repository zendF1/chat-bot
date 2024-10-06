import { Prop, Schema } from '@nestjs/mongoose';
import { UserTokenType } from 'src/shares/constants/user.constant';

@Schema({ _id: false })
export class UserToken {
  @Prop({ type: String })
  token: string; // The token string used to authenticate the user.

  @Prop({ type: String })
  type: UserTokenType; // Token type, e.g. access or refresh.

  @Prop({ type: Date })
  expiresAt: Date; // The expiration date of the token.
}
