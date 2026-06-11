import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAgenteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nro_esclf!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  CI!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  grado!: string;
}
