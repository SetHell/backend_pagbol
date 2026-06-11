import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { UsuarioJwt } from '../auth/strategies/jwt.strategy';
import { AgentesService } from './agentes.service';

type RequestConUsuario = {
  user: UsuarioJwt;
};

@Controller('agentes')
@UseGuards(JwtAuthGuard)
export class AgentesController {
  constructor(private readonly agentesService: AgentesService) {}

  @Get('me')
  buscarActual(@Req() req: RequestConUsuario) {
    return this.agentesService.buscar(req.user.nro_esclf);
  }

  @Get(':nro_esclf')
  buscar(@Param('nro_esclf') nro_esclf: string, @Req() req: RequestConUsuario) {
    const solicitado = nro_esclf.toUpperCase();

    if (solicitado !== req.user.nro_esclf) {
      throw new ForbiddenException(
        'No tiene permiso para consultar este agente',
      );
    }

    return this.agentesService.buscar(solicitado);
  }
}
