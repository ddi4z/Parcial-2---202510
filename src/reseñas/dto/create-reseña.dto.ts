import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class CreateReseñaDto {
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsDateString()
  fecha: string;

  @IsNumber()
  @Type(() => Number)
  estudianteId: number;

  @IsNumber()
  @Type(() => Number)
  actividadId: number;
}
