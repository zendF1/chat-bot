import { Prop, Schema } from '@nestjs/mongoose';
import { UserGender } from 'src/shares/constants/user.constant';

@Schema({ _id: false })
export class UserProfile {
  @Prop({ type: String })
  firstName: string; // User's name.

  @Prop({ type: String })
  lastName: string; // User's last name.

  @Prop({ type: String })
  avatarUrl: string; // URL of profile picture.

  @Prop({ type: Date })
  dateOfBirth: Date; // User's date of birth.

  @Prop({ type: String })
  gender: UserGender; // User's gender.

  @Prop({ type: String })
  phoneNumber: string; // User's phone number.

  @Prop({ type: String })
  address: UserAddress; // User's address.
}

@Schema({ _id: false })
export class UserAddress {
  @Prop({ type: String })
  street: string; // User's street address.

  @Prop({ type: String })
  city: string; // User's city.

  @Prop({ type: String })
  state: string; // User's state.

  @Prop({ type: String })
  zip: string; // User's zip code.

  @Prop({ type: String })
  country: string; // User's country.
}
