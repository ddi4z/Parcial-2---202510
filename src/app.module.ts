import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ReseñasModule } from './reseñas/reseñas.module';
import { ActividadesModule } from './actividades/actividades.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { Reseña } from './reseñas/entities/reseña.entity';
import { Actividad } from './actividades/entities/actividad.entity';
import { Estudiante } from './estudiantes/entities/estudiante.entity';

@Module({
  imports: [
    EstudiantesModule,
    ReseñasModule,
    ActividadesModule,
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: +(process.env.DB_PORT ?? 5000),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'parcial2DB',
      entities: [Reseña, Actividad, Estudiante],
      synchronize: true,
      dropSchema: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
