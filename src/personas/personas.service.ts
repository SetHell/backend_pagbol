import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './persona.entity';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
  ) {}

  crear(dto: CreatePersonaDto) {
    const persona = this.personaRepo.create(dto);
    return this.personaRepo.save(persona);
  }

  listar() {
    return this.personaRepo.find();
  }

  async buscar(CI: string) {
    const persona = await this.personaRepo.findOne({ where: { CI } });

    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }

    return persona;
  }

  async actualizar(CI: string, dto: UpdatePersonaDto) {
    const persona = await this.buscar(CI);
    Object.assign(persona, dto);
    return this.personaRepo.save(persona);
  }

  async eliminar(CI: string) {
    const persona = await this.buscar(CI);
    return this.personaRepo.remove(persona);
  }
}
