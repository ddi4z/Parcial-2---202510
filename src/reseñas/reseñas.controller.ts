import { Controller, Post, Body } from '@nestjs/common';
import { ReseñasService } from './reseñas.service';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { plainToInstance } from 'class-transformer';
import { Reseña } from './entities/reseña.entity';

@Controller('reseñas')
export class ReseñasController {
  constructor(private readonly reseñasService: ReseñasService) {}

  @Post()
  agregarReseña(@Body() createReseñaDto: CreateReseñaDto) {
    const reseña = plainToInstance(Reseña, createReseñaDto);
    return this.reseñasService.agregarReseña(reseña);
  }
}
