import { Injectable } from '@nestjs/common';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>
  ) {}

  async crearActividad(actividad: Actividad) {
    if (actividad.titulo.length < 15) {
      throw new BusinessLogicException(
        'titulo de actividad no cumple longitud minima',
        BusinessError.NOT_FOUND,
      );
    }
    return await this.actividadRepository.save(actividad);
  }

  async cambiarEstado(actividadID: number, estado: number){
    const actividad = await this.findActividadById(actividadID);
    if (
      actividad.cupoMaximo * 0.8 > actividad.estudiantes.length &&
      estado === 1
    ) {
      throw new BusinessLogicException(
        'No se cumple con los cupos para cerrarla',
        BusinessError.PRECONDITION_FAILED,
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

  findAll() {
    return `This action returns all actividades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actividade`;
  }

  update(id: number, updateActividadDto: UpdateActividadDto) {
    return `This action updates a #${id} actividade`;
  }

  async findActividadById(id: number) {
    const actividad = await this.actividadRepository.findOne({
      where: { id },
    });
    if (!actividad) {
      throw new BusinessLogicException(
        'Actividad no encontrada',
        BusinessError.NOT_FOUND,
      );
    }
    return actividad;
  }

  remove(id: number) {
    return `This action removes a #${id} actividade`;
  }
}
