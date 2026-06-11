import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  placa!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  marca!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tip_vehi!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  color!: string;
}
