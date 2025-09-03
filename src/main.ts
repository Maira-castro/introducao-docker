import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não decoradas no DTO
      forbidNonWhitelisted: true, // Retorna erro se enviar propriedades não permitidas
      transform: true, // Transforma os tipos automaticamente (ex: string para number)
    })
  );
  // Configurações da documentação Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Produtos')
    .setDescription('Documentação da API de produtos')
    .setVersion('1.0')
    .addBearerAuth({//esquema JWT Bearer
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

  await app.listen(3001);
}
bootstrap();