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
}
