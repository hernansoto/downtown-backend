"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors(); // útil para conexiones desde móviles/web
    await app.listen(3000);
}
bootstrap();
