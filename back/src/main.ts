import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable the validation.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors();

  const docs = new DocumentBuilder()
    .setTitle('Station API')
    .setDescription('The fuel station API description')
    .setVersion('1.0')
    .addTag('station')
    .build();
  const document = SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
