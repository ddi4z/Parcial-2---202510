import { Entity, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Base } from '../../shared/base.entity';
import { Reseña } from 'src/reseñas/entities/reseña.entity';
import { Actividad } from 'src/actividades/entities/actividad.entity';

@Entity()
export class Estudiante extends Base {
  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  programa: string;

  @Column()
  semestre: number;

  @OneToMany(() => Reseña, (reseña) => reseña.estudiante)
  reseñas: Reseña[];

  @ManyToMany(() => Actividad, (actividad) => actividad.estudiantes)
  @JoinTable()
  actividades: Actividad;
}
