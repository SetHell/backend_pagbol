import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateVehiculoDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  marca?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tip_vehi?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  color?: string;
}
