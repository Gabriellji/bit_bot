import { plainToClass } from 'class-transformer';
import { IsNumber, validateSync, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  TELEGRAM_BOT_TOKEN: string;

  @IsString()
  CHAT_ID: string;

  @IsString()
  WEB3_HOST: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
