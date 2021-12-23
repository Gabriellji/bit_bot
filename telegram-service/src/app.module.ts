import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafConfigService } from 'src/services/telegraf-config.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from 'src/app.update';
import { InputContract } from 'src/scenes/input_contract.scene';
import { validate } from '../env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigService,
    }),
  ],
  providers: [AppUpdate, InputContract],
})
export class AppModule {}
