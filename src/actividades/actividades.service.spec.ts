import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { plainToInstance } from 'class-transformer';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { ActividadesService } from '../actividades/actividades.service';
import { Actividad } from '../actividades/entities/actividad.entity';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';

describe('ActividadesService', () => {
  let service: ActividadesService;
  let actividadRepository: Repository<Actividad>;
  let estudianteService: EstudiantesService;
  let actividad: Actividad;
  let estudiantes: Estudiante[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadesService, EstudiantesService],
    }).compile();

    service = module.get<ActividadesService>(ActividadesService);
    estudianteService = module.get<EstudiantesService>(EstudiantesService);
    actividadRepository = module.get<Repository<Actividad>>(
      getRepositoryToken(Actividad),
    );
    actividad = await seedDatabase();
    estudiantes = await seedStudents(10);
  });

  const seedDatabase = async () => {
    await actividadRepository.clear();
    return await actividadRepository.save({
      titulo: 'Actividad de prueba valida',
      fecha: faker.date.future().toISOString(),
      cupoMaximo: 10,
      estado: 0,
      reseñas: [],
      estudiantes: [],
    });
  };

  const seedStudents = async (count: number) => {
    const students: Estudiante[] = [];
    for (let i = 0; i < count; i++) {
      students.push(
        await estudianteService.crearEstudiante(
          plainToInstance(Estudiante, {
            cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
            nombre: faker.person.firstName(),
            correo: faker.internet.email(),
            programa: faker.lorem.word(),
            semestre: faker.number.int({ min: 1, max: 10 }),
          }),
        ),
      );
    }
    return students;
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearActividad', () => {
    it('should create a valid activity', async () => {
      const nuevaActividad = plainToInstance(Actividad, {
        titulo: 'Titulo de actividad valida',
        fecha: faker.date.future().toISOString(),
        cupoMaximo: 20,
        reseñas: [],
        estudiantes: [],
      });

      const result = await service.crearActividad(nuevaActividad);
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.estado).toBe(0);
      expect(result.titulo).toEqual(nuevaActividad.titulo);
    });

    it('should fail if the title has fewer than 15 characters', async () => {
      const nuevaActividad = plainToInstance(Actividad, {
        titulo: 'Corto',
        fecha: faker.date.future().toISOString(),
        cupoMaximo: 20,
        reseñas: [],
        estudiantes: [],
      });

      await expect(service.crearActividad(nuevaActividad)).rejects.toThrow(
        BusinessLogicException,
      );
    });

    it('should fail if the title contains symbols', async () => {
      const nuevaActividad = plainToInstance(Actividad, {
        titulo: 'Título inválido $$$',
        fecha: faker.date.future().toISOString(),
        cupoMaximo: 20,
        reseñas: [],
        estudiantes: [],
      });

      await expect(service.crearActividad(nuevaActividad)).rejects.toThrow(
        BusinessLogicException,
      );
    });
  });

  describe('cambiarEstado', () => {
    it('should change the activity status to Closed (1) if at least 80% of the spots are filled', async () => {
      actividad.estudiantes = estudiantes.slice(0, 8);
      await actividadRepository.save(actividad);

      const result = await service.cambiarEstado(actividad.id, 1);
      expect(result.estado).toBe(1);
    });

    it('should fail to close if less than 80% of the spots are filled', async () => {
      actividad.estudiantes = estudiantes.slice(0, 5);
      await actividadRepository.save(actividad);

      await expect(service.cambiarEstado(actividad.id, 1)).rejects.toThrow(
        BusinessLogicException,
      );
    });

    it('should fail if the status is not 0, 1, or 2', async () => {
      await expect(service.cambiarEstado(actividad.id, 5)).rejects.toThrow(
        BusinessLogicException,
      );
    });

    it('should finalize the activity if the maximum number of participants is reached', async () => {
      actividad.estudiantes = estudiantes.slice(0, actividad.cupoMaximo);
      await actividadRepository.save(actividad);

      const result = await service.cambiarEstado(actividad.id, 2);
      expect(result.estado).toBe(2);
    });

    it('should fail to finalize if there are still available spots', async () => {
      actividad.estudiantes = estudiantes.slice(0, actividad.cupoMaximo - 1);
      await actividadRepository.save(actividad);

      await expect(service.cambiarEstado(actividad.id, 2)).rejects.toThrow(
        BusinessLogicException,
      );
    });
  });

  describe('findAllActividadesByDate', () => {
    it('should return activities by date', async () => {
      const actividades = await service.findAllActividadesByDate(
        actividad.fecha,
      );
      expect(actividades.length).toBeGreaterThan(0);
      expect(actividades[0].fecha).toEqual(actividad.fecha);
    });

    it('should return an empty array if there are no activities on the given date', async () => {
      const actividades = await service.findAllActividadesByDate('2099-01-01');
      expect(actividades.length).toBe(0);
    });
  });

  describe('findActividadById', () => {
    it('should return an existing activity', async () => {
      const result = await service.findActividadById(actividad.id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(actividad.id);
    });

    it('should fail if the activity does not exist', async () => {
      await expect(service.findActividadById(-1)).rejects.toThrow(
        BusinessLogicException,
      );
    });
  });
});
