import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InfraccionesService } from './infracciones.service';
import { CreateInfraccionDto } from './dto/create-infraccion.dto';
import { UpdateInfraccionDto } from './dto/update-infraccion.dto';

@Controller('infracciones')
export class InfraccionesController {
  constructor(private readonly infraccionesService: InfraccionesService) {}

  @Post()
  crear(@Body() dto: CreateInfraccionDto) {
    return this.infraccionesService.crear(dto);
  }

  @Get()
  listar() {
    return this.infraccionesService.listar();
  }

  @Get(':nro_infr')
  buscar(@Param('nro_infr') nro_infr: string) {
    return this.infraccionesService.buscar(nro_infr);
  }

  @Patch(':nro_infr')
  actualizar(
    @Param('nro_infr') nro_infr: string,
    @Body() dto: UpdateInfraccionDto,
  ) {
    return this.infraccionesService.actualizar(nro_infr, dto);
  }

  @Delete(':nro_infr')
  eliminar(@Param('nro_infr') nro_infr: string) {
    return this.infraccionesService.eliminar(nro_infr);
  }
}
