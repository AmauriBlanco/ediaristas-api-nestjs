import { Injectable } from '@nestjs/common';
import { DiaristaMapper } from './diaristas.mapper';
import { DiaristaRepository } from './diaristas.repository';
import { EnderecoService } from '../consulta-endereco/adapters/endereco-service';

@Injectable()
export class DiaristasService {
  constructor(
    private diaristaRepository: DiaristaRepository,
    private diaristaMapper: DiaristaMapper,
    private enderecoService: EnderecoService,
  ) {}
  async buscarDiaristaPorCep(cep: string) {
    const codigoIbge = await this.buscarCodigoIbgePorcep(cep);
    const usuarios =
      await this.diaristaRepository.repository.buscarDiaristaPorCodigoIbge(
        codigoIbge,
      );
    return usuarios.map((usuario) =>
      this.diaristaMapper.toDiaristaLocalidadeResponseDto(usuario),
    );
  }
  private async buscarCodigoIbgePorcep(cep: string) {
    return await (
      await this.enderecoService.buscarEnderecoCep(cep)
    ).ibge;
  }
}
