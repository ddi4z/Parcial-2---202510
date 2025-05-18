import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { plainToInstance } from 'class-transformer';
import { Actividad } from './entities/actividad.entity';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business.errors.interceptor';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  crearActividad(@Body() createActividadDto: CreateActividadDto) {
    const actividad = plainToInstance(Actividad, createActividadDto);
    return this.actividadesService.crearActividad(actividad);
  }

  @Patch(':id')
  cambiarEstado(
    @Param('id') id: string,
    @Body() updateActividadDto: UpdateActividadDto,
  ) {
    const actividadID = parseInt(id, 10);
    const { estado } = updateActividadDto;
    return this.actividadesService.cambiarEstado(actividadID, estado);
  }

  @Get(':fecha')
  findAllActividadesByDate(@Param('fecha') fecha: string) {
    return this.actividadesService.findAllActividadesByDate(fecha);
  }
}
