import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/actividad.entity';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService],
  imports: [TypeOrmModule.forFeature([Actividad])],
  exports: [ActividadesService],
})
export class ActividadesModule {}
