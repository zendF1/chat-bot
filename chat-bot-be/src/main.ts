import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'config/config.service';
import { LoggingInterceptor } from 'src/interceptors/logger.interceptors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new LoggingInterceptor());

  const appConfig = app.get(ConfigService);
  const { host, port } = appConfig.getAppConfig();

  const config = new DocumentBuilder();
  config.setTitle('Chat Bot API'); // Set the title of the Swagger document
  config.setVersion('1.0.0'); // Set the version of the Swagger document
  config.addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your access token',
      name: 'Authorization',
      in: 'header',
    },
    'JWT-auth',
  ); // Add a bearer authentication scheme to the Swagger document
  config.addTag('Chat Bot', 'Chat Bot API'); // Add a tag to the Swagger document
  const document = SwaggerModule.createDocument(app, config.build()); // Create the Swagger document
  SwaggerModule.setup('api/v1', app, document); // Set up the Swagger UI

  await app.listen(port, host);
  console.log(`Application is running on: ${await app.getUrl()}/api/v1`);
}
bootstrap();
