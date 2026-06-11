import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agente } from './agente.entity';
import { Persona } from '../personas/persona.entity';
import { AgentesController } from './agentes.controller';
import { AgentesService } from './agentes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agente, Persona])],
  controllers: [AgentesController],
  providers: [AgentesService],
  exports: [AgentesService, TypeOrmModule],
})
export class AgentesModule {}
