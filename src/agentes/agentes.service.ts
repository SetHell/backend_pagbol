import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from '../personas/persona.entity';
import { Repository } from 'typeorm';
import { Agente } from './agente.entity';
import { CreateAgenteDto } from './dto/create-agente.dto';
import { UpdateAgenteDto } from './dto/update-agente.dto';

@Injectable()
export class AgentesService {
  constructor(
    @InjectRepository(Agente)
    private readonly agenteRepo: Repository<Agente>,

    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
  ) {}

  async crear(dto: CreateAgenteDto) {
    const persona = await this.personaRepo.findOne({ where: { CI: dto.CI } });

    if (!persona) {
      throw new NotFoundException('La persona asociada no existe');
    }

    const agente = this.agenteRepo.create(dto);
    return this.agenteRepo.save(agente);
  }

  listar() {
    return this.agenteRepo.find({
      relations: { persona: true },
    });
  }

  async buscar(nro_esclf: string) {
    const agente = await this.agenteRepo.findOne({
      where: { nro_esclf },
      relations: { persona: true },
    });

    if (!agente) {
      throw new NotFoundException('Agente no encontrado');
    }

    return agente;
  }

  async actualizar(nro_esclf: string, dto: UpdateAgenteDto) {
    const agente = await this.buscar(nro_esclf);

    if (dto.CI) {
      const persona = await this.personaRepo.findOne({ where: { CI: dto.CI } });

      if (!persona) {
        throw new NotFoundException('La persona asociada no existe');
      }
    }

    Object.assign(agente, dto);
    return this.agenteRepo.save(agente);
  }

  async eliminar(nro_esclf: string) {
    const agente = await this.buscar(nro_esclf);
    return this.agenteRepo.remove(agente);
  }
}
