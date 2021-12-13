import { plainToClass } from 'class-transformer';
import { IsNumber, validateSync, IsString } from 'class-validator';

class EnvironmentVariables {

  @IsNumber()
  PORT: number;

  @IsString()
  TELEGRAM_BOT_TOKEN: string;
  CHAT_ID: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
