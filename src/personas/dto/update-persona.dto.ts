import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePersonaDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombres?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidos?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;
}
