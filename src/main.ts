import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  // Configurações da documentação Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gerenciamento de produtos')
    .setDescription('API para gerenciamento de produtos, com autenticação de usuários e controle de perfil.')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header'
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //  await app.listen(process.env.API_PORT ?? 3001);

  await app.listen(3002);
}
bootstrap();