import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReseñasService } from './reseñas.service';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { plainToInstance } from 'class-transformer';
import { Reseña } from './entities/reseña.entity';

@Controller('reseñas')
export class ReseñasController {
  constructor(private readonly reseñasService: ReseñasService) {}

  @Post()
  agregarReseña(@Body() createReseñaDto: CreateReseñaDto) {
    const reseña = plainToInstance(Reseña, createReseñaDto)
    return this.reseñasService.agregarReseña(reseña);
  }

  @Get()
  findAll() {
    return this.reseñasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reseñasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReseñaDto: UpdateReseñaDto) {
    return this.reseñasService.update(+id, updateReseñaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reseñasService.remove(+id);
  }
}
