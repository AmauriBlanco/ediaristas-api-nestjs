import { Module } from '@nestjs/common';
import { OportunidadesService } from './oportunidades.service';
import { OportunidadesController } from './oportunidades.controller';
import { DiariaRepository } from '../diarias/diarias.repository';
import { DiariaMapper } from '../diarias/diarias.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaria } from '../diarias/entities/diaria.entity';
import { ClienteMapper } from '../clientes/cliente.mapper';
import { DiaristaMapper } from '../diaristas/diaristas.mapper';
import { HateasOportunidade } from 'src/core/hateoas/hateoas-oportunidades';
import { Avaliacao } from '../avaliacoes/entities/avaliacao.entity';
import { AvaliacaoRepository } from '../avaliacoes/avaliacao.repository';
import { AvaliacaoMapper } from '../avaliacoes/avaliacao.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria, Avaliacao])],
  controllers: [OportunidadesController],
  providers: [
    OportunidadesService,
    DiariaRepository,
    DiariaMapper,
    ClienteMapper,
    DiaristaMapper,
    HateasOportunidade,
    AvaliacaoRepository,
    AvaliacaoMapper,
  ],
})
export class OportunidadesModule {}
