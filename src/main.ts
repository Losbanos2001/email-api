
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Email API')
    .setDescription('Self-hosted email sending API')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
      'api-key',
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory, {
    ui: true,
    raw: true,
    customSiteTitle: 'Email API Swagger',
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);

  console.log(`API running at http://localhost:${port}`);
  console.log(`Swagger UI at http://localhost:${port}/docs`);
}

bootstrap();
