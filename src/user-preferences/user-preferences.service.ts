import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './schemas/user-preference.schema';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private readonly userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto): Promise<UserPreference> {
    const createdUserPreference = new this.userPreferenceModel(createUserPreferenceDto);
    return createdUserPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    return this.userPreferenceModel.findOne({ userId }).exec();
  }

  async update(userId: string, updateUserPreferenceDto: UpdateUserPreferenceDto): Promise<UserPreference> {
    return this.userPreferenceModel.findOneAndUpdate(
      { userId },
      updateUserPreferenceDto,
      { new: true },
    );
  }

  async remove(userId: string): Promise<void> {
    await this.userPreferenceModel.deleteOne({ userId }).exec();
  }
}
