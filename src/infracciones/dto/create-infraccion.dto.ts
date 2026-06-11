import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateInfraccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nro_infr!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  art!: string;

  @IsOptional()
  @IsString()
  descr?: string;

  @IsOptional()
  @IsString()
  obsv?: string;
}
