import { Injectable } from '@nestjs/common';
import { Reseña } from './entities/reseña.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReseñasService {
  constructor(
    @InjectRepository(Reseña)
    private readonly reseñaRepository: Repository<Reseña>,
  ) {}

  async agregarReseña(reseña: Reseña) {
    return await this.reseñaRepository.save(reseña);
  }
}
