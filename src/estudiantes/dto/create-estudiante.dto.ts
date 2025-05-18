import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateEstudianteDto {
  @IsInt()
  @Min(1)
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  programa: string;
}
