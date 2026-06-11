import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { databaseConfig } from './config/database.config';

import { AuthModule } from './auth/auth.module';
import { OcrModule } from './ocr/ocr.module';
import { PersonasModule } from './personas/personas.module';
import { AgentesModule } from './agentes/agentes.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { InfraccionesModule } from './infracciones/infracciones.module';
import { BoletasModule } from './boletas/boletas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),

    AuthModule,
    PersonasModule,
    AgentesModule,
    VehiculosModule,
    InfraccionesModule,
    BoletasModule,
    OcrModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
