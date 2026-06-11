import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAgenteDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  CI?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  grado?: string;
}
