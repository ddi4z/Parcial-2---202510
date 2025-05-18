import { Injectable } from '@nestjs/common';
import { Reseña } from './entities/reseña.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ReseñasService {
  constructor(
    @InjectRepository(Reseña)
    private readonly reseñaRepository: Repository<Reseña>,
  ) {}

  async agregarReseña(reseña: Reseña) {
    const actividad = reseña.actividad;
    const estudiante = reseña.estudiante;
    if (actividad.estado !== 2) {
      throw new BusinessLogicException(
        'La actividad no ha finalizado',
        BusinessError.BAD_REQUEST,
      );
    }
    const estudianteInscrito = estudiante.actividades.some(
      (a) => a.id === actividad.id,
    );

    if (!estudianteInscrito) {
      throw new BusinessLogicException(
        'El estudiante no estuvo inscrito en la actividad',
        BusinessError.BAD_REQUEST,
      );
    }
    return await this.reseñaRepository.save(reseña);
  }
}
