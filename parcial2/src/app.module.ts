import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ReseñasModule } from './reseñas/reseñas.module';
import { ActividadesModule } from './actividades/actividades.module';

@Module({
  imports: [EstudiantesModule, ReseñasModule, ActividadesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
