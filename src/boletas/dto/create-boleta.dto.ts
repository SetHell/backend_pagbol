import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateBoletaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nro_boleta!: string;

  @IsDateString()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
    message: 'La hora debe tener formato HH:mm o HH:mm:ss',
  })
  hora!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^[0-9]{3,4}[A-Z]{3}$/, {
    message: 'La placa debe tener 3 o 4 números seguidos de 3 letras',
  })
  placa!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Matches(/^[0-9]*$/, {
    message: 'La licencia solo debe contener números',
  })
  nro_lic?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  categ_lic?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  @Matches(/^[A-ZÁÉÍÓÚÜÑ\s]*$/i, {
    message: 'El nombre del conductor solo debe contener letras',
  })
  nom_conductor?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tip_vehi!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  marca!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  color!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  art!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  @Matches(/^[0-9]{1,3}$/, {
    message: 'El número de infracción debe contener de 1 a 3 dígitos',
  })
  nro_infr!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  lugar!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  zona!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  observ?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
