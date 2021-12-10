import { Injectable } from '@nestjs/common';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { session } from 'telegraf';

@Injectable()
export class TelegrafConfigService {
  constructor(private readonly configService: ConfigService) {}
  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: this.configService.get('TELEGRAM_BOT_TOKEN'),
      middlewares: [session()],
    };
  }
}
