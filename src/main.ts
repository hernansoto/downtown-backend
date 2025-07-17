// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // útil para conexiones desde móviles/web
  await app.listen(3000);
}
bootstrap();
