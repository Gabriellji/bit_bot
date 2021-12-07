import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafConfigService } from './services/telegraf-config.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigService,
    }),
  ],
  providers: [AppUpdate],
})
export class AppModule {}
