import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  CI!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;
}
