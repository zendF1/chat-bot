import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseEntity {
  @Prop({ default: 'system' })
  createdBy?: string;
  // Define a property 'createdAt' with a default value of the current date and time
  @Prop({ default: Date.now })
  createdAt: Date;

  // Define a property 'updatedAt' with a default value of the current date and time
  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: 'system' })
  updatedBy: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
