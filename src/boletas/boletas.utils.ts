import { ConflictException } from '@nestjs/common';
import { Vehiculo } from '../vehiculos/vehiculo.entity';

export type DatosVehiculo = {
  placa: string;
  marca: string;
  tip_vehi: string;
  color: string;
};

export type DatosInfraccion = {
  nro_infr: string;
  art: string;
};

export const normalizar = (valor?: string | null) => {
  return (valor || '').trim().toUpperCase();
};

export const validarVehiculoExistente = (
  vehiculo: Vehiculo,
  datos: DatosVehiculo,
) => {
  const diferencias: string[] = [];

  if (normalizar(vehiculo.marca) !== normalizar(datos.marca)) {
    diferencias.push(
      `MARCA no coincide. Registrado: ${vehiculo.marca}, enviado: ${datos.marca}`,
    );
  }

  if (normalizar(vehiculo.tip_vehi) !== normalizar(datos.tip_vehi)) {
    diferencias.push(
      `TIPO no coincide. Registrado: ${vehiculo.tip_vehi}, enviado: ${datos.tip_vehi}`,
    );
  }

  if (diferencias.length > 0) {
    throw new ConflictException({
      message: `La placa ${vehiculo.placa} ya existe con datos distintos del vehículo`,
      campo: 'VEHICULO',
      placa: vehiculo.placa,
      datos_registrados: {
        marca: vehiculo.marca,
        tip_vehi: vehiculo.tip_vehi,
        color: vehiculo.color,
      },
      datos_enviados: {
        marca: datos.marca,
        tip_vehi: datos.tip_vehi,
        color: datos.color,
      },
      diferencias,
      nota: 'El color puede variar, pero marca y tipo deben coincidir.',
    });
  }
};
