import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agente } from '../agentes/agente.entity';
import { Infraccion } from '../infracciones/infraccion.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';
import { Boleta } from './boleta.entity';
import { BoletasController } from './boletas.controller';
import { BoletasService } from './boletas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Boleta, Vehiculo, Infraccion, Agente])],
  controllers: [BoletasController],
  providers: [BoletasService],
  exports: [BoletasService, TypeOrmModule],
})
export class BoletasModule {}
