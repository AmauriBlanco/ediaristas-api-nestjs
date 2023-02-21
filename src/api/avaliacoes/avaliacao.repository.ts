import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diaria } from '../diarias/entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { Avaliacao } from './entities/avaliacao.entity';

export class AvaliacaoRepository {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  repository = this.avaliacaoRepository.extend({
    async getAvaliacaoMedia(usuario: UsuarioApi): Promise<number> {
      const { avg } = await this.createQueryBuilder('avaliacao')
        .leftJoinAndSelect('avaliacao.avaliado', 'avaliado')
        .where('avaliacao.avaliado_id = :id', { id: usuario.id })
        .select('AVG(avaliacao.nota)', 'avg')
        .getRawOne();

      return avg;
    },

    async isClienteAndDiaristaAvaliaramDiaria(
      diaria: Diaria,
    ): Promise<boolean> {
      const numeroDeAvaliacoes = await this.createQueryBuilder('avaliacao')
        .where('avaliacao.diaria = :id', { id: diaria.id })
        .getCount();

      return numeroDeAvaliacoes >= 2 ? true : false;
    },
  });
}
