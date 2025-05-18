import { Injectable } from '@nestjs/common';
import { Estudiante } from './entities/estudiante.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadesService } from 'src/actividades/actividades.service';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    private readonly actividadesService: ActividadesService,
  ) {}

  async crearEstudiante(estudiante: Estudiante) {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!estudiante.correo || !correoRegex.test(estudiante.correo)) {
      throw new BusinessLogicException(
        'Correo no válido',
        BusinessError.BAD_REQUEST,
      );
    }

    if (
      !estudiante.semestre ||
      estudiante.semestre < 1 ||
      estudiante.semestre > 10
    ) {
      throw new BusinessLogicException(
        'Semestre debe estar entre 1 y 10',
        BusinessError.BAD_REQUEST,
      );
    }

    return await this.estudianteRepository.save(estudiante);
  }

  async findEstudianteById(id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
    });
    if (!estudiante) {
      throw new BusinessLogicException(
        'Estudiante no encontrado',
        BusinessError.NOT_FOUND,
      );
    }
    return estudiante;
  }

  async inscribirseActividad(estudianteID: number, actividadID: number) {
    const estudiante = await this.findEstudianteById(estudianteID);
    const actividad =
      await this.actividadesService.findActividadById(actividadID);

    const estaInscrito = estudiante.actividades.some(
      (a) => a.id === actividad.id,
    );
    if (estaInscrito) {
      throw new BusinessLogicException(
        'Estudiante ya inscrito a la actvidad',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    estudiante.actividades = [...(estudiante.actividades || []), actividad];
    return await this.estudianteRepository.save(estudiante);
  }
}
