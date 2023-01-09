import { Injectable } from '@nestjs/common';
import { CreateDiariaDto } from './dto/create-diaria.dto';
import { UpdateDiariaDto } from './dto/update-diaria.dto';

@Injectable()
export class DiariasService {
  create(createDiariaDto: CreateDiariaDto) {
    return 'This action adds a new diaria';
  }

  findAll() {
    return `This action returns all diarias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diaria`;
  }

  update(id: number, updateDiariaDto: UpdateDiariaDto) {
    return `This action updates a #${id} diaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} diaria`;
  }
}
