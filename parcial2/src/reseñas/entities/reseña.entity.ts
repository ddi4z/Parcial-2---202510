import { Actividad } from 'src/actividades/entities/actividad.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Column, ManyToOne } from 'typeorm';
import { Base } from '../../shared/base.entity';

export class Reseña extends Base {
  @Column()
  comentario: string;

  @Column()
  calificacion: number;

  @Column()
  fecha: string;
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.reseñas)
  estudiante: Estudiante;

  @ManyToOne(() => Actividad, (actividad) => actividad.reseñas)
  actividad: Actividad;
}
