import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaria } from './entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { Servico } from '../servicos/entities/servico.entity';
import { DiaristaRepository } from '../diaristas/diaristas.repository';
import { DiariaMapper } from './diarias.mapper';
import { DiariaRepository } from './diarias.repository';
import { ClienteMapper } from '../clientes/cliente.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria, UsuarioApi, Servico])],
  controllers: [DiariasController],
  providers: [
    DiariasService,
    DiaristaRepository,
    DiariasService,
    DiariaMapper,
    DiariaRepository,
    ClienteMapper,
  ],
})
export class DiariasModule {}
