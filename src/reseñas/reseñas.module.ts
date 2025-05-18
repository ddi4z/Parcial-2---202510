import { Module } from '@nestjs/common';
import { ReseñasService } from './reseñas.service';
import { ReseñasController } from './reseñas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reseña } from './entities/reseña.entity';

@Module({
  controllers: [ReseñasController],
  providers: [ReseñasService],
  imports: [TypeOrmModule.forFeature([Reseña])],
  exports: [ReseñasService],
})
export class ReseñasModule {}
