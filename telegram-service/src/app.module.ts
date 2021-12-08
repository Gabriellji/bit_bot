import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafConfigService } from './services/telegraf-config.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';
import { InputContract } from './scenes/input_contract.scene';
import { session } from 'telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TelegrafModule.forRootAsync({
    //   useClass: TelegrafConfigService,
    // }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      middlewares: [session()],
    }),
  ],
  providers: [AppUpdate, InputContract],
})
export class AppModule {}
