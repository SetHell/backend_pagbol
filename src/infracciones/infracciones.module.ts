import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Infraccion } from './infraccion.entity';
import { InfraccionesController } from './infracciones.controller';
import { InfraccionesService } from './infracciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Infraccion])],
  controllers: [InfraccionesController],
  providers: [InfraccionesService],
  exports: [InfraccionesService, TypeOrmModule],
})
export class InfraccionesModule {}
