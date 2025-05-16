import { Injectable } from '@nestjs/common';
import { Estudiante } from './entities/estudiante.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
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
    if (!estudiante.correo || estudiante.correo === '') {
      throw new BusinessLogicException(
        'Correo no valido',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    if (
      !estudiante.semestre ||
      estudiante.semestre < 1 ||
      estudiante.semestre > 10
    ) {
      throw new BusinessLogicException(
        'Semestre debe estar entre 1 y 10',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.estudianteRepository.save(estudiante);
  }

  findAll() {
    return `This action returns all estudiantes`;
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

    return 
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
