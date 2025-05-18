import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { plainToInstance } from 'class-transformer';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  crearEstudiante(@Body() createEstudianteDto: CreateEstudianteDto) {
    const estudiante = plainToInstance(Estudiante, createEstudianteDto);
    return this.estudiantesService.crearEstudiante(estudiante);
  }

  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':id')
  findEstudianteById(@Param('id') id: string) {
    return this.estudiantesService.findEstudianteById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudiantesService.remove(+id);
  }
}
