import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');
  await app.listen(port);
}
bootstrap();
