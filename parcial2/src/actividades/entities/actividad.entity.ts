import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Base } from '../../shared/base.entity';
import { Reseña } from 'src/reseñas/entities/reseña.entity';

@Entity()
export class Actividad extends Base {
  @Column()
  titulo: string;

  @Column()
  fecha: string;

  @Column()
  cupoMaximo: number;

  @Column()
  estado: number;

  @OneToMany(() => Reseña, (reseña) => reseña.actividad)
  reseñas: Reseña[];

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.actividades)
  estudiantes: Estudiante[];
}
