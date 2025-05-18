import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { Reseña } from '../../reseñas/entities/reseña.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Reseña, Actividad, Estudiante],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Reseña, Actividad, Estudiante]),
];
