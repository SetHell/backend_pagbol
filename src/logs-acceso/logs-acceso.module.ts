import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcceso } from './log-acceso.entity';
import { LogAccesoService } from './logs-acceso.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogAcceso])],
  providers: [LogAccesoService],
  exports: [LogAccesoService],
})
export class LogAccesoModule {}
