import {
  IsString,
  IsDateString,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsDateString()
  fecha: string;

  @IsInt()
  @Min(1)
  cupoMaximo: number;
}
