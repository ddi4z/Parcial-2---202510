import { Controller, Post, Body } from '@nestjs/common';
import { ReseñasService } from './reseñas.service';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { plainToInstance } from 'class-transformer';
import { Reseña } from './entities/reseña.entity';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { ActividadesService } from '../actividades/actividades.service';

@Controller('reseñas')
export class ReseñasController {
  constructor(
    private readonly reseñasService: ReseñasService,
    private readonly estudiantesService: EstudiantesService,
    private readonly actividadesService: ActividadesService,
  ) {}

  @Post()
  async agregarReseña(@Body() createReseñaDto: CreateReseñaDto) {
    const reseña = plainToInstance(Reseña, createReseñaDto);
    const estudiante = await this.estudiantesService.findEstudianteById(
      createReseñaDto.estudianteId,
    );
    const actividad = await this.actividadesService.findActividadById(
      createReseñaDto.actividadId,
    );
    reseña.actividad = actividad;
    reseña.estudiante = estudiante;
    return this.reseñasService.agregarReseña(reseña);
  }
}
