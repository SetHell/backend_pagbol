import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

const obtenerOrigenesPermitidos = () => {
  const origenes = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL,
  ];

  return origenes.filter((origen): origen is string => Boolean(origen));
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.enableCors({
    origin: obtenerOrigenesPermitidos(),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Backend funcionando en http://localhost:${port}/api`);
}

void bootstrap();
