import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateEstudianteDto {
  @IsInt()
  @Min(1)
  @Max(10)
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsInt()
  @Min(1)
  semestre: number;

  @IsString()
  @IsNotEmpty()
  programa: string;
}
