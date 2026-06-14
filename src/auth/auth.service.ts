import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Agente } from '../agentes/agente.entity';
import { Persona } from '../personas/persona.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogAccesoService } from '../logs-acceso/logs-acceso.service';

type JwtPayload = {
  sub: string;
  nro_esclf: string;
  CI: string;
  grado: string;
};

type AgenteLogin = {
  nro_esclf: string;
  CI: string;
  grado: string;
  persona: Persona;
};

type LoginResponse = {
  token: string;
  agente: AgenteLogin;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Agente)
    private readonly agenteRepo: Repository<Agente>,

    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,

    private readonly jwtService: JwtService,
    private readonly logService: LogAccesoService,
  ) {}

  async login(
    dto: LoginDto,
    ip: string,
    browser: string,
  ): Promise<LoginResponse> {
    const agente = await this.agenteRepo
      .createQueryBuilder('agente')
      .addSelect('agente.password')
      .leftJoinAndSelect('agente.persona', 'persona')
      .where('agente.nro_esclf = :nro_esclf', {
        nro_esclf: dto.nro_esclf,
      })
      .getOne();

    if (!agente || !agente.password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordCorrecto = await bcrypt.compare(
      dto.password,
      agente.password,
    );

    if (!passwordCorrecto) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload: JwtPayload = {
      sub: agente.nro_esclf,
      nro_esclf: agente.nro_esclf,
      CI: agente.CI,
      grado: agente.grado,
    };

    const token = await this.jwtService.signAsync(payload);
    await this.logService.registrar(agente.nro_esclf, ip, 'ingreso', browser);

    return {
      token,
      agente: {
        nro_esclf: agente.nro_esclf,
        CI: agente.CI,
        grado: agente.grado,
        persona: agente.persona,
      },
    };
  }

  async logout(nro_esclf: string, ip: string, browser: string) {
    await this.logService.registrar(nro_esclf, ip, 'salida', browser);
    return { mensaje: 'Sesión cerrada' };
  }

  async register(dto: RegisterDto) {
    const agenteExistente = await this.agenteRepo.findOne({
      where: {
        nro_esclf: dto.nro_esclf,
      },
    });

    if (agenteExistente) {
      throw new BadRequestException('El número de escalafón ya existe');
    }
    const personaExistente = await this.personaRepo.findOne({
      where: {
        CI: dto.CI,
      },
    });

    if (personaExistente) {
      throw new BadRequestException('El CI ya existe');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const persona = this.personaRepo.create({
      CI: dto.CI,
      nombres: dto.nombres,
      apellidos: dto.apellidos,
    });

    await this.personaRepo.save(persona);

    const agente = this.agenteRepo.create({
      nro_esclf: dto.nro_esclf,
      CI: dto.CI,
      grado: dto.grado,
      password: passwordHash,
    });

    await this.agenteRepo.save(agente);

    return {
      mensaje: 'Agente registrado correctamente',
    };
  }
}
