import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shares/entities/base.entity';

@Schema()
export class UserHistoryLogEntity extends BaseEntity {
  @Prop({ type: String, required: true, ref: 'UserEntities' })
  userId: string;

  @Prop({ type: String })
  action: string; // Actions the user performs, e.g. login, update_profile.

  @Prop({ type: Date })
  timestamp: Date; // Time the action is taken.

  @Prop({ type: String })
  ipAddress?: string; // The IP address of the user when performing the action.

  @Prop({ type: String })
  userAgent?: string; // Information about the browser or device used by the user.

  @Prop({ type: Object })
  changes?: any; // If the action involves changing information, old and new changes will be stored here (e.g. firstName, lastName changes).
}

export const UserHistoryLogEntitySchema =
  SchemaFactory.createForClass(UserHistoryLogEntity);
