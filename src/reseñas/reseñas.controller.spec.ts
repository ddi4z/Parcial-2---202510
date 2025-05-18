import { Test, TestingModule } from '@nestjs/testing';
import { ReseñasController } from './reseñas.controller';
import { ReseñasService } from './reseñas.service';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { ActividadesService } from '../actividades/actividades.service';

describe('ReseñasController', () => {
  let controller: ReseñasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReseñasController],
      providers: [
        {
          provide: ReseñasService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: EstudiantesService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: ActividadesService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReseñasController>(ReseñasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
