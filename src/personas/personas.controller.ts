import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post()
  crear(@Body() dto: CreatePersonaDto) {
    return this.personasService.crear(dto);
  }

  @Get()
  listar() {
    return this.personasService.listar();
  }

  @Get(':CI')
  buscar(@Param('CI') CI: string) {
    return this.personasService.buscar(CI);
  }

  @Patch(':CI')
  actualizar(@Param('CI') CI: string, @Body() dto: UpdatePersonaDto) {
    return this.personasService.actualizar(CI, dto);
  }

  @Delete(':CI')
  eliminar(@Param('CI') CI: string) {
    return this.personasService.eliminar(CI);
  }
}
