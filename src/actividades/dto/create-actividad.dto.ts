import {
  IsString,
  IsDateString,
  IsInt,
  Min,
  Max,
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

  @IsInt()
  @Min(0)
  @Max(2)
  estado: number;
}
