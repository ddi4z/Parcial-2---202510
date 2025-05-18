import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { plainToInstance } from 'class-transformer';
import { Estudiante } from './entities/estudiante.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business.errors.interceptor';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  crearEstudiante(@Body() createEstudianteDto: CreateEstudianteDto) {
    const estudiante = plainToInstance(Estudiante, createEstudianteDto);
    return this.estudiantesService.crearEstudiante(estudiante);
  }

  @Get(':id')
  findEstudianteById(@Param('id') id: string) {
    return this.estudiantesService.findEstudianteById(+id);
  }

  @Post(':estudianteID/inscripcion/:actividadID')
  inscribirseActividad(
    @Param('estudianteID') estudianteID: string,
    @Param('actividadID') actividadID: string,
  ) {
    return this.estudiantesService.inscribirseActividad(
      +estudianteID,
      +actividadID,
    );
  }
}
