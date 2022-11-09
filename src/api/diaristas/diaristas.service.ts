import { Injectable } from '@nestjs/common';
import { DiaristaMapper } from './diaristas.mapper';
import { DiaristaRepository } from './diaristas.repository';
import { EnderecoService } from '../consulta-endereco/adapters/endereco-service';
import { DiaristaLocalidadesPagedResponse } from './dto/diarista-localidades-paged-reponse.dto';

@Injectable()
export class DiaristasService {
  constructor(
    private diaristaRepository: DiaristaRepository,
    private diaristaMapper: DiaristaMapper,
    private enderecoService: EnderecoService,
  ) {}
  async buscarDiaristaPorCep(cep: string) {
    const codigoIbge = await this.buscarCodigoIbgePorcep(cep);
    const pageSize = 6;
    const usuarios =
      await this.diaristaRepository.repository.buscarDiaristaPorCodigoIbge(
        codigoIbge,
        pageSize,
      );
    const diaristas = usuarios.content.map((usuario) =>
      this.diaristaMapper.toDiaristaLocalidadeResponseDto(usuario),
    );
    return new DiaristaLocalidadesPagedResponse(
      diaristas,
      pageSize,
      usuarios.totalElmentos,
    );
  }
  private async buscarCodigoIbgePorcep(cep: string) {
    return await (
      await this.enderecoService.buscarEnderecoCep(cep)
    ).ibge;
  }
}
