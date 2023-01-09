import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { CreateDiariaDto } from './dto/create-diaria.dto';
import { UpdateDiariaDto } from './dto/update-diaria.dto';

@Controller('diarias')
export class DiariasController {
  constructor(private readonly diariasService: DiariasService) {}

  @Post()
  create(@Body() createDiariaDto: CreateDiariaDto) {
    return this.diariasService.create(createDiariaDto);
  }

  @Get()
  findAll() {
    return this.diariasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diariasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiariaDto: UpdateDiariaDto) {
    return this.diariasService.update(+id, updateDiariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diariasService.remove(+id);
  }
}
