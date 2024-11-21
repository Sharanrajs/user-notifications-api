import { IsString, IsBoolean, IsEmail, IsEnum, IsObject, IsOptional } from 'class-validator';

class ChannelsDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;
}

export class UpdateUserPreferenceDto {
  @IsEmail()
  @IsOptional()
  email?: string;

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
  @IsOptional()
  frequency?: 'daily' | 'weekly' | 'monthly' | 'never';

  @IsObject()
  @IsOptional()
  channels?: ChannelsDto;

  @IsString()
  @IsOptional()
  timezone?: string;
}
