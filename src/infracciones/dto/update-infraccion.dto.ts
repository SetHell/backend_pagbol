import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateInfraccionDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  art?: string;

  @IsOptional()
  @IsString()
  descr?: string;

  @IsOptional()
  @IsString()
  obsv?: string;
}
