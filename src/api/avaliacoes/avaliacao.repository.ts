import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './entities/avaliacao.entity';

export class AvaliacaoRepository {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  repository = this.avaliacaoRepository.extend({});
}
