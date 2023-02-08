import { Injectable } from '@nestjs/common';
import { CandidaturasController } from 'src/api/candidaturas/candidaturas.controller';
import { DiariaOportunidadeResponseDto } from 'src/api/diarias/dto/diaria-oportunidade-response.dto';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-reponse.dto';
import { HateoasBase } from './hateoas-base';
import { HateoasLinks } from './hateoas.interface';

@Injectable()
export class HateasOportunidade extends HateoasBase {
  gerarLinksHateos(diaria?: DiariaOportunidadeResponseDto): HateoasLinks[] {
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
