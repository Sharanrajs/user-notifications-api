import { validate } from 'class-validator';
import { CreateUserPreferenceDto } from './create-user-preference.dto';

describe('CreateUserPreferenceDto', () => {
  it('should pass validation for valid input', async () => {
    const dto = new CreateUserPreferenceDto();
    dto.userId = 'user123';
    dto.email = 'user@example.com';
    dto.frequency = 'weekly';
    dto.channels = { email: true, sms: false, push: true };
    dto.timezone = 'America/New_York';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for missing required fields', async () => {
    const dto = new CreateUserPreferenceDto();
    dto.userId = 'user123';
    dto.email = 'invalid-email';
    dto.frequency = 'invalid-frequency';  // invalid value
    dto.channels = { email: true, sms: false, push: true };
    dto.timezone = 'America/New_York';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
