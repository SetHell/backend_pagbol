import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nro_esclf!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password!: string;
}
