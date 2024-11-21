import { IsString, IsBoolean, IsEmail, IsEnum, IsObject, IsOptional } from 'class-validator';

class ChannelsDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;
}

export class CreateUserPreferenceDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  marketing?: boolean;

  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;

  @IsBoolean()
  @IsOptional()
  updates?: boolean;

  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';

  @IsObject()
  channels: ChannelsDto;

  @IsString()
  timezone: string;
}
