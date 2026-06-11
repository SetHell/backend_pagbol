import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepo: Repository<Vehiculo>,
  ) {}

  crear(dto: CreateVehiculoDto) {
    const vehiculo = this.vehiculoRepo.create(dto);
    return this.vehiculoRepo.save(vehiculo);
  }

  listar() {
    return this.vehiculoRepo.find();
  }

  async buscar(placa: string) {
    const vehiculo = await this.vehiculoRepo.findOne({ where: { placa } });

    if (!vehiculo) {
      throw new NotFoundException('Vehículo no encontrado');
    }

    return vehiculo;
  }

  async actualizar(placa: string, dto: UpdateVehiculoDto) {
    const vehiculo = await this.buscar(placa);
    Object.assign(vehiculo, dto);
    return this.vehiculoRepo.save(vehiculo);
  }

  async eliminar(placa: string) {
    const vehiculo = await this.buscar(placa);
    return this.vehiculoRepo.remove(vehiculo);
  }
}
