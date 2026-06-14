import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogAcceso } from './log-acceso.entity';

@Injectable()
export class LogAccesoService {
  constructor(
    @InjectRepository(LogAcceso)
    private readonly repo: Repository<LogAcceso>,
  ) {}

  registrar(
    nro_esclf: string,
    ip: string,
    evento: 'ingreso' | 'salida',
    browser: string,
  ) {
    const log = this.repo.create({ nro_esclf, ip, evento, browser });
    return this.repo.save(log);
  }

  listar(nro_esclf?: string) {
    if (nro_esclf) {
      return this.repo.find({
        where: { nro_esclf },
        order: { fecha_hora: 'DESC' },
        take: 200,
      });
    }
    return this.repo.find({ order: { fecha_hora: 'DESC' }, take: 500 });
  }
}
