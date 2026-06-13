import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
}
