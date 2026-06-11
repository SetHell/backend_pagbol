import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VehiculosService } from './vehiculos.service';

@Controller('vehiculos')
@UseGuards(JwtAuthGuard)
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Get(':placa')
  buscar(@Param('placa') placa: string) {
    return this.vehiculosService.buscar(placa.toUpperCase());
  }
}
