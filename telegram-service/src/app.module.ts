import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafConfigService } from 'src/services/telegraf-config.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from 'src/app.update';
import { InputContract } from 'src/scenes/input_contract.scene';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigService,
    }),
  ],
  providers: [AppUpdate, InputContract],
})
export class AppModule {}
