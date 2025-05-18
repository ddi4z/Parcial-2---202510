import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReseñasService } from './reseñas.service';
import { Reseña } from './entities/reseña.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('ReseñasService', () => {
  let service: ReseñasService;
  let reseñaRepository: Repository<Reseña>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReseñasService,
        {
          provide: getRepositoryToken(Reseña),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReseñasService>(ReseñasService);
    reseñaRepository = module.get<Repository<Reseña>>(
      getRepositoryToken(Reseña),
    );
  });

  it('should successfully add a valid review', async () => {
    const actividad = plainToInstance(Actividad, {
      id: 1,
      estado: 2,
    });

    const estudiante = plainToInstance(Estudiante, {
      id: 1,
      actividades: [{ id: 1 }],
    });

    const reseña = plainToInstance(Reseña, {
      comentario: 'Great activity',
      calificacion: 5,
      actividad,
      estudiante,
    });

    jest.spyOn(reseñaRepository, 'save').mockResolvedValue(reseña);
    const result = await service.agregarReseña(reseña);

    expect(result).toBeDefined();
    expect(result.comentario).toEqual('Great activity');
    expect(result.calificacion).toEqual(5);
  });

  it('should throw an exception if the activity is not finished', async () => {
    const actividad = plainToInstance(Actividad, {
      id: 2,
      estado: 1,
    });

    const estudiante = plainToInstance(Estudiante, {
      id: 2,
      actividades: [{ id: 2 }],
    });

    const reseña = plainToInstance(Reseña, {
      comentario: 'Invalid review',
      calificacion: 3,
      actividad,
      estudiante,
    });

    await expect(service.agregarReseña(reseña)).rejects.toThrow(
      BusinessLogicException,
    );
  });
});
