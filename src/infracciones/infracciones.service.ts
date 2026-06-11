import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Infraccion } from './infraccion.entity';
import { CreateInfraccionDto } from './dto/create-infraccion.dto';
import { UpdateInfraccionDto } from './dto/update-infraccion.dto';

@Injectable()
export class InfraccionesService {
  constructor(
    @InjectRepository(Infraccion)
    private readonly infraccionRepo: Repository<Infraccion>,
  ) {}

  crear(dto: CreateInfraccionDto) {
    const infraccion = this.infraccionRepo.create(dto);
    return this.infraccionRepo.save(infraccion);
  }

  listar() {
    return this.infraccionRepo.find();
  }

  async buscar(nro_infr: string) {
    const infraccion = await this.infraccionRepo.findOne({
      where: { nro_infr },
    });

    if (!infraccion) {
      throw new NotFoundException('Infracción no encontrada');
    }

    return infraccion;
  }

  async actualizar(nro_infr: string, dto: UpdateInfraccionDto) {
    const infraccion = await this.buscar(nro_infr);
    Object.assign(infraccion, dto);
    return this.infraccionRepo.save(infraccion);
  }

  async eliminar(nro_infr: string) {
    const infraccion = await this.buscar(nro_infr);
    return this.infraccionRepo.remove(infraccion);
  }
}
