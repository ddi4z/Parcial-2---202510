import { IsInt, Min, Max } from 'class-validator';

export class UpdateActividadDto {
  @IsInt()
  @Min(0)
  @Max(2)
  estado: number;
}
