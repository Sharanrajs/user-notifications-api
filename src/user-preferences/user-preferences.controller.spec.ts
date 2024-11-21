import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

describe('UserPreferencesController', () => {
  let controller: UserPreferencesController;
  let service: UserPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPreferencesController],
      providers: [
        {
          provide: UserPreferencesService,
          useValue: {
            create: jest.fn().mockResolvedValue('user123'),
            findOne: jest.fn().mockResolvedValue('user123'),
            update: jest.fn().mockResolvedValue('updatedUser123'),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UserPreferencesController>(UserPreferencesController);
    service = module.get<UserPreferencesService>(UserPreferencesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user preference', async () => {
    const createUserPreferenceDto = new CreateUserPreferenceDto();
    createUserPreferenceDto.userId = 'user123';
    createUserPreferenceDto.email = 'user@example.com';
    createUserPreferenceDto.frequency = 'weekly';
    createUserPreferenceDto.channels = { email: true, sms: false, push: true };
    createUserPreferenceDto.timezone = 'America/New_York';

    const result = await controller.create(createUserPreferenceDto);
    expect(result).toBe('user123');
  });

  it('should find a user preference', async () => {
    const result = await controller.findOne('user123');
    expect(result).toBe('user123');
  });

  it('should update a user preference', async () => {
    const updateUserPreferenceDto = new UpdateUserPreferenceDto();
    updateUserPreferenceDto.frequency = 'monthly';

    const result = await controller.update('user123', updateUserPreferenceDto);
    expect(result).toBe('updatedUser123');
  });

  it('should remove a user preference', async () => {
    const result = await controller.remove('user123');
    expect(result).toBeUndefined();
  });
});
