import { Test, TestingModule } from '@nestjs/testing';
import { ReseñasService } from './reseñas.service';
import { Reseña } from './entities/reseña.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('ReseñasService', () => {
  let service: ReseñasService;
  let reseñaRepository: Repository<Reseña>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReseñasService],
    }).compile();

    service = module.get<ReseñasService>(ReseñasService);
    reseñaRepository = module.get<Repository<Reseña>>(
      getRepositoryToken(Reseña),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    await reseñaRepository.clear();
    for (let i = 0; i < 5; i++) {
      await reseñaRepository.save({
        comentario: faker.lorem.sentence(),
        calificacion: faker.number.int({ min: 1, max: 5 }),
        fecha: faker.date.recent().toISOString(),
      });
    }
  };
});
