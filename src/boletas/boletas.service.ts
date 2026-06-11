import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agente } from '../agentes/agente.entity';
import { Infraccion } from '../infracciones/infraccion.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';

import { Boleta } from './boleta.entity';
import type { CreateBoletaDto } from './dto/create-boleta.dto';
import type { UpdateBoletaDto } from './dto/update-boleta.dto';
import {
  type DatosInfraccion,
  type DatosVehiculo,
  validarVehiculoExistente,
} from './boletas.utils';

type CreateBoletaConAgente = CreateBoletaDto & {
  nro_esclf: string;
};

@Injectable()
export class BoletasService {
  constructor(
    @InjectRepository(Boleta)
    private readonly boletaRepo: Repository<Boleta>,

    @InjectRepository(Vehiculo)
    private readonly vehiculoRepo: Repository<Vehiculo>,

    @InjectRepository(Infraccion)
    private readonly infraccionRepo: Repository<Infraccion>,

    @InjectRepository(Agente)
    private readonly agenteRepo: Repository<Agente>,
  ) {}

  private async validarAgente(nro_esclf: string) {
    const agente = await this.agenteRepo.findOne({
      where: { nro_esclf },
    });

    if (!agente) {
      throw new NotFoundException({
        message: `No existe el agente con escalafón ${nro_esclf}`,
        campo: 'AGENTE',
        valor: nro_esclf,
      });
    }

    return agente;
  }

  private validarPropietario(boleta: Boleta, nro_esclf: string) {
    if (boleta.nro_esclf !== nro_esclf) {
      throw new ForbiddenException(
        'No tiene permiso para acceder a esta boleta',
      );
    }
  }

  private async validarBoletaNueva(nro_boleta: string) {
    const existeBoleta = await this.boletaRepo.findOne({
      where: { nro_boleta },
    });

    if (existeBoleta) {
      throw new ConflictException({
        message: `Ya existe una boleta registrada con el número ${nro_boleta}`,
        campo: 'NRO BOLETA',
        valor: nro_boleta,
      });
    }
  }

  private async guardarOActualizarVehiculo(datos: DatosVehiculo) {
    let vehiculo = await this.vehiculoRepo.findOne({
      where: { placa: datos.placa },
    });

    if (vehiculo) {
      validarVehiculoExistente(vehiculo, datos);

      vehiculo.color = datos.color;
      return this.vehiculoRepo.save(vehiculo);
    }

    vehiculo = this.vehiculoRepo.create({
      placa: datos.placa,
      marca: datos.marca,
      tip_vehi: datos.tip_vehi,
      color: datos.color,
    });

    return this.vehiculoRepo.save(vehiculo);
  }

  private async guardarOActualizarInfraccion(datos: DatosInfraccion) {
    let infraccion = await this.infraccionRepo.findOne({
      where: { nro_infr: datos.nro_infr },
    });

    if (!infraccion) {
      infraccion = this.infraccionRepo.create({
        nro_infr: datos.nro_infr,
        art: datos.art,
      });

      return this.infraccionRepo.save(infraccion);
    }

    infraccion.art = datos.art;
    return this.infraccionRepo.save(infraccion);
  }

  async crear(dto: CreateBoletaConAgente) {
    await this.validarBoletaNueva(dto.nro_boleta);
    await this.validarAgente(dto.nro_esclf);

    await this.guardarOActualizarVehiculo({
      placa: dto.placa,
      marca: dto.marca,
      tip_vehi: dto.tip_vehi,
      color: dto.color,
    });

    await this.guardarOActualizarInfraccion({
      nro_infr: dto.nro_infr,
      art: dto.art,
    });

    const boleta = this.boletaRepo.create({
      nro_boleta: dto.nro_boleta,
      fecha: dto.fecha,
      hora: dto.hora,

      placa: dto.placa,
      nro_lic: dto.nro_lic || undefined,
      categ_lic: dto.categ_lic || undefined,
      nom_conductor: dto.nom_conductor || undefined,

      tip_vehi: dto.tip_vehi,
      marca: dto.marca,
      color: dto.color,

      art: dto.art,
      nro_infr: dto.nro_infr,

      lugar: dto.lugar,
      zona: dto.zona,
      observ: dto.observ || undefined,

      nro_esclf: dto.nro_esclf,
      activo: dto.activo ?? true,
    });

    return this.boletaRepo.save(boleta);
  }

  listar(nro_esclf: string) {
    return this.boletaRepo.find({
      where: {
        activo: true,
        nro_esclf,
      },
      relations: {
        vehiculo: true,
        infraccion: true,
        agente: {
          persona: true,
        },
      },
      order: {
        fech_reg: 'DESC',
      },
    });
  }

  async buscar(nro_boleta: string, nro_esclf: string) {
    const boleta = await this.boletaRepo.findOne({
      where: { nro_boleta },
      relations: {
        vehiculo: true,
        infraccion: true,
        agente: {
          persona: true,
        },
      },
    });

    if (!boleta) {
      throw new NotFoundException({
        message: `No existe la boleta ${nro_boleta}`,
        campo: 'NRO BOLETA',
        valor: nro_boleta,
      });
    }

    this.validarPropietario(boleta, nro_esclf);

    return boleta;
  }

  async actualizar(
    nro_boleta: string,
    dto: UpdateBoletaDto,
    nro_esclfAutenticado: string,
  ) {
    const boleta = await this.buscar(nro_boleta, nro_esclfAutenticado);

    await this.validarAgente(nro_esclfAutenticado);

    const placaFinal = dto.placa ?? boleta.placa;
    const marcaFinal = dto.marca ?? boleta.marca;
    const tipoFinal = dto.tip_vehi ?? boleta.tip_vehi;
    const colorFinal = dto.color ?? boleta.color;

    await this.guardarOActualizarVehiculo({
      placa: placaFinal,
      marca: marcaFinal,
      tip_vehi: tipoFinal,
      color: colorFinal,
    });

    const nroInfrFinal = dto.nro_infr ?? boleta.nro_infr;
    const artFinal = dto.art ?? boleta.art;

    await this.guardarOActualizarInfraccion({
      nro_infr: nroInfrFinal,
      art: artFinal,
    });

    boleta.fecha = dto.fecha ?? boleta.fecha;
    boleta.hora = dto.hora ?? boleta.hora;

    boleta.placa = placaFinal;

    boleta.nro_lic = dto.nro_lic ?? boleta.nro_lic;
    boleta.categ_lic = dto.categ_lic ?? boleta.categ_lic;
    boleta.nom_conductor = dto.nom_conductor ?? boleta.nom_conductor;

    boleta.tip_vehi = tipoFinal;
    boleta.marca = marcaFinal;
    boleta.color = colorFinal;

    boleta.art = artFinal;
    boleta.nro_infr = nroInfrFinal;

    boleta.lugar = dto.lugar ?? boleta.lugar;
    boleta.zona = dto.zona ?? boleta.zona;
    boleta.observ = dto.observ ?? boleta.observ;

    boleta.nro_esclf = nro_esclfAutenticado;

    await this.boletaRepo.save(boleta);

    return this.buscar(nro_boleta, nro_esclfAutenticado);
  }

  async eliminarLogico(nro_boleta: string, nro_esclfAutenticado: string) {
    const boleta = await this.buscar(nro_boleta, nro_esclfAutenticado);

    boleta.activo = false;
    boleta.fech_elim = new Date();

    return this.boletaRepo.save(boleta);
  }
}
