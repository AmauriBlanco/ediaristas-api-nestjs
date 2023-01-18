import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { ConsultaCidade } from './consulta-cidade';
import { CidadeResponseDto } from './dto/cidade-response-dto';

@Injectable()
export class IbgeService implements ConsultaCidade {
  BASE_URL = 'https://servicodados.ibge.gov.br/api/v1';

  async buscarCidadePorCodigoIbge(
    codigoIbge: string,
  ): Promise<CidadeResponseDto> {
    const url = `${this.BASE_URL}/localidades/municipios/${codigoIbge}`;
    const cidade = new CidadeResponseDto();

    try {
      const response = await axios.get(url);
      cidade.cidade = response.data.nome;
      cidade.estado = response.data.microrregiao.mesorregiao.UF.sigla;
      cidade.ibge = codigoIbge;

      return cidade;
    } catch (error) {
      if (!error.response) {
        throw new NotFoundException('Codigo IBGE Não Encontrado');
      }
      throw new BadRequestException('Código IBGE inválido');
    }
  }
}
