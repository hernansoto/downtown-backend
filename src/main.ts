// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = process.env.PORT || 3000; // 🟢 usa 3000 local, pero 80 en producción
  await app.listen(PORT);
}
bootstrap();
