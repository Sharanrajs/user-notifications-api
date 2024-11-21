import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPreferenceDocument = UserPreference & Document;

@Schema()
export class UserPreference {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: true })
  marketing: boolean;

  @Prop({ default: false })
  newsletter: boolean;

  @Prop({ default: true })
  updates: boolean;

  @Prop({ default: 'weekly' })
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';

  @Prop({ type: Object, default: {} })
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };

  @Prop({ required: true })
  timezone: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
