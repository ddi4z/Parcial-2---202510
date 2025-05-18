import { Module } from '@nestjs/common';
import { ReseñasService } from './reseñas.service';
import { ReseñasController } from './reseñas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reseña } from './entities/reseña.entity';
import { ActividadesModule } from 'src/actividades/actividades.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';

@Module({
  controllers: [ReseñasController],
  providers: [ReseñasService],
  imports: [
    TypeOrmModule.forFeature([Reseña]),
    ActividadesModule,
    EstudiantesModule,
  ],
  exports: [ReseñasService],
})
export class ReseñasModule {}
