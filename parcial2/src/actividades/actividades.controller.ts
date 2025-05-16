import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { plainToInstance } from 'class-transformer';
import { Actividad } from './entities/actividad.entity';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  crearActividad(@Body() createActividadDto: CreateActividadDto) {
    const actividad = plainToInstance(Actividad, createActividadDto);
    return this.actividadesService.crearActividad(actividad);
  }

  @Get()
  findAll() {
    return this.actividadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActividadDto: UpdateActividadDto,
  ) {
    return this.actividadesService.update(+id, updateActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadesService.remove(+id);
  }
}
