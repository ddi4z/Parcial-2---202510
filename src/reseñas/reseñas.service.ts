import { Injectable } from '@nestjs/common';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
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

  findAll() {
    return `This action returns all reseñas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reseña`;
  }

  update(id: number, updateReseñaDto: UpdateReseñaDto) {
    return `This action updates a #${id} reseña`;
  }

  remove(id: number) {
    return `This action removes a #${id} reseña`;
  }
}
