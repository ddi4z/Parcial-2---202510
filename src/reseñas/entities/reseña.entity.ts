import { Actividad } from '../../actividades/entities/actividad.entity';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../shared/base.entity';

@Entity()
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
