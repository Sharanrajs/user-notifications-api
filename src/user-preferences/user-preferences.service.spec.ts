import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesService } from './user-preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from './schemas/user-preference.schema';
import { Model } from 'mongoose';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let model: Model<UserPreference>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            save: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserPreferencesService>(UserPreferencesService);
    model = module.get<Model<UserPreference>>(getModelToken(UserPreference.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user preference', async () => {
    const createUserPreferenceDto = {
      userId: 'user123',
      email: 'user@example.com',
      frequency: 'weekly',
      channels: { email: true, sms: false, push: true },
      timezone: 'America/New_York',
    };

    model.save.mockResolvedValue(createUserPreferenceDto);

    const result = await service.create(createUserPreferenceDto);
    expect(result).toEqual(createUserPreferenceDto);
  });

  it('should find a user preference', async () => {
    const userPreference = { userId: 'user123', email: 'user@example.com' };
    model.findOne.mockResolvedValue(userPreference);

    const result = await service.findOne('user123');
    expect(result).toEqual(userPreference);
  });

  it('should update a user preference', async () => {
    const updateUserPreferenceDto = { frequency: 'monthly' };
    const updatedPreference = { userId: 'user123', frequency: 'monthly' };

    model.findOneAndUpdate.mockResolvedValue(updatedPreference);

    const result = await service.update('user123', updateUserPreferenceDto);
    expect(result).toEqual(updatedPreference);
  });

  it('should remove a user preference', async () => {
    model.deleteOne.mockResolvedValue({});

    const result = await service.remove('user123');
    expect(result).toBeUndefined();
  });
});
