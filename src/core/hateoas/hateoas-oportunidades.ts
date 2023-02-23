import { Injectable } from '@nestjs/common';
import { CandidaturasController } from 'src/api/candidaturas/candidaturas.controller';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { HateoasBase } from './hateoas-base';
import { HateoasLinks } from './hateoas.interface';

@Injectable()
export class HateasOportunidade extends HateoasBase {
  gerarLinksHateos(diaria?: Diaria): HateoasLinks[] {
    this.LINKS = [];

    const params = {
      id: diaria.id,
    };

    this.adicionarLinks(
      'POST',
      'candidatar_diaria',
      CandidaturasController,
      CandidaturasController.prototype.candidatar,
      params,
    );

    return this.LINKS;
  }
}
