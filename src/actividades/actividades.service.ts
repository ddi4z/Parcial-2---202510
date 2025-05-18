import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

  async crearActividad(actividad: Actividad) {
    actividad.estado = 0;
    const tituloValido = /^[a-zA-Z0-9\s]+$/.test(actividad.titulo);
    if (actividad.titulo.length < 15) {
      throw new BusinessLogicException(
        'El título de la actividad debe tener al menos 15 caracteres.',
        BusinessError.BAD_REQUEST,
      );
    }
    if (!tituloValido) {
      throw new BusinessLogicException(
        'El título de la actividad no debe contener símbolos. Solo se permiten letras, números y espacios.',
        BusinessError.BAD_REQUEST,
      );
    }
    return await this.actividadRepository.save(actividad);
  }

  async cambiarEstado(actividadID: number, estado: number) {
    const actividad = await this.findActividadById(actividadID);
    if (
      actividad.cupoMaximo * 0.8 > actividad.estudiantes.length &&
      estado === 1
    ) {
      throw new BusinessLogicException(
        'No se puede cerrar la actividad: menos del 80% del cupo está ocupado.',
        BusinessError.BAD_REQUEST,
      );
    }
    if (![0, 1, 2].includes(estado)) {
      throw new BusinessLogicException(
        'Estado inválido. Solo se permiten los valores 0 (Abierta), 1 (Cerrada) o 2 (Finalizada).',
        BusinessError.BAD_REQUEST,
      );
    }

    if (estado === 2 && actividad.estudiantes.length < actividad.cupoMaximo) {
      throw new BusinessLogicException(
        'No se puede finalizar la actividad: aún hay cupos disponibles.',
        BusinessError.BAD_REQUEST,
      );
    }

    actividad.estado = estado;
    return await this.actividadRepository.save(actividad);
  }

  async findAllActividadesByDate(fecha: string) {
    return await this.actividadRepository.find({
      where: { fecha },
    });
  }

  async findActividadById(id: number) {
    const actividad = await this.actividadRepository.findOne({
      where: { id },
      relations: ['estudiantes'],
    });
    if (!actividad) {
      throw new BusinessLogicException(
        'Actividad no encontrada',
        BusinessError.NOT_FOUND,
      );
    }
    return actividad;
  }
}
