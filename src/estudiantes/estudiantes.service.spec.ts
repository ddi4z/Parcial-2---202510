import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ActividadesService } from '../actividades/actividades.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { plainToInstance } from 'class-transformer';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Actividad } from '../actividades/entities/actividad.entity';

describe('EstudiantesService', () => {
  let estudiantesService: EstudiantesService;
  let actividadesService: ActividadesService;
  let estudianteRepository: Repository<Estudiante>;
  let estudiante: Estudiante;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudiantesService, ActividadesService],
    }).compile();

    estudiantesService = module.get<EstudiantesService>(EstudiantesService);
    estudianteRepository = module.get<Repository<Estudiante>>(
      getRepositoryToken(Estudiante),
    );
    actividadesService = module.get<ActividadesService>(ActividadesService);
    estudiante = await seedDatabase();
  });

  it('should be defined', () => {
    expect(estudiantesService).toBeDefined();
  });

  describe('crearEstudiante function', () => {
    const sampleStudentData: CreateEstudianteDto = {
      cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
      nombre: faker.person.firstName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: faker.number.int({ min: 1, max: 10 }),
    };

    it('should create a student with valid data', async () => {
      const student = plainToInstance(Estudiante, { ...sampleStudentData });
      const result = await estudiantesService.crearEstudiante(student);
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.cedula).toEqual(sampleStudentData.cedula);
      expect(result.nombre).toEqual(sampleStudentData.nombre);
      expect(result.correo).toEqual(sampleStudentData.correo);
      expect(result.programa).toEqual(sampleStudentData.programa);
      expect(result.semestre).toEqual(sampleStudentData.semestre);
    });

    it('should throw an error with invalid email', async () => {
      const invalidStudent = plainToInstance(Estudiante, {
        ...sampleStudentData,
        correo: 'invalid-email',
      });
      try {
        await estudiantesService.crearEstudiante(invalidStudent);
        fail('Expected BusinessLogicException was not thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessLogicException);
        const businessError = error as BusinessLogicException;
        expect(businessError.type).toBe(BusinessError.BAD_REQUEST);
        expect(businessError.message).toBe('Correo no válido');
      }
    });

    it('should throw an error with invalid semester', async () => {
      const invalidStudent = plainToInstance(Estudiante, {
        ...sampleStudentData,
        semestre: 11,
      });
      try {
        await estudiantesService.crearEstudiante(invalidStudent);
        fail('Expected BusinessLogicException was not thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessLogicException);
        const businessError = error as BusinessLogicException;
        expect(businessError.type).toBe(BusinessError.BAD_REQUEST);
        expect(businessError.message).toBe('Semestre debe estar entre 1 y 10');
      }
    });
  });

  describe('findEstudianteById', () => {
    it('should return a student if exists', async () => {
      const result = await estudiantesService.findEstudianteById(estudiante.id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(estudiante.id);
      expect(result.cedula).toEqual(estudiante.cedula);
      expect(result.nombre).toEqual(estudiante.nombre);
      expect(result.correo).toEqual(estudiante.correo);
      expect(result.programa).toEqual(estudiante.programa);
      expect(result.semestre).toEqual(estudiante.semestre);
    });

    it('should throw an error if student does not exist', async () => {
      await expect(estudiantesService.findEstudianteById(-1)).rejects.toThrow(
        BusinessLogicException,
      );
    });
  });

  describe('inscribirseActividad', () => {
    let actividad: Actividad;
    const sampleActividad = {
      titulo: 'titulo de ejemplo para la actividad',
      fecha: faker.date.future().toISOString(),
      cupoMaximo: faker.number.int({ min: 10, max: 30 }),
      estado: faker.number.int({ min: 0, max: 1 }),
      reseñas: [],
      estudiantes: [],
    };

    beforeEach(async () => {
      actividad = await actividadesService.crearActividad(
        plainToInstance(Actividad, sampleActividad),
      );
    });

    it('should enroll a student in an activity', async () => {
      const result = await estudiantesService.inscribirseActividad(
        estudiante.id,
        actividad.id,
      );
      expect(result.actividades.length).toBeGreaterThan(0);
      expect(result.actividades[0].id).toEqual(actividad.id);
    });

    it('should throw an error if student is already enrolled', async () => {
      await estudiantesService.inscribirseActividad(
        estudiante.id,
        actividad.id,
      );
      await expect(
        estudiantesService.inscribirseActividad(estudiante.id, actividad.id),
      ).rejects.toThrow(BusinessLogicException);
    });
  });

  const seedDatabase = async () => {
    await estudianteRepository.clear();
    return await estudianteRepository.save({
      cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
      nombre: faker.person.firstName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: faker.number.int({ min: 1, max: 10 }),
      reseñas: [],
      actividades: [],
    });
  };
});
