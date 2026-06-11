import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { UsuarioJwt } from '../auth/strategies/jwt.strategy';
import { BoletasService } from './boletas.service';
import { CreateBoletaDto } from './dto/create-boleta.dto';
import { UpdateBoletaDto } from './dto/update-boleta.dto';

type RequestConUsuario = {
  user: UsuarioJwt;
};

@Controller('boletas')
@UseGuards(JwtAuthGuard)
export class BoletasController {
  constructor(private readonly boletasService: BoletasService) {}

  @Post()
  crear(@Body() dto: CreateBoletaDto, @Req() req: RequestConUsuario) {
    return this.boletasService.crear({
      ...dto,
      nro_esclf: req.user.nro_esclf,
    });
  }

  @Get()
  listar(@Req() req: RequestConUsuario) {
    return this.boletasService.listar(req.user.nro_esclf);
  }

  @Get(':nro_boleta')
  buscar(
    @Param('nro_boleta') nro_boleta: string,
    @Req() req: RequestConUsuario,
  ) {
    return this.boletasService.buscar(nro_boleta, req.user.nro_esclf);
  }

  @Patch(':nro_boleta')
  actualizar(
    @Param('nro_boleta') nro_boleta: string,
    @Body() dto: UpdateBoletaDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.boletasService.actualizar(nro_boleta, dto, req.user.nro_esclf);
  }

  @Delete(':nro_boleta')
  eliminar(
    @Param('nro_boleta') nro_boleta: string,
    @Req() req: RequestConUsuario,
  ) {
    return this.boletasService.eliminarLogico(nro_boleta, req.user.nro_esclf);
  }
}
