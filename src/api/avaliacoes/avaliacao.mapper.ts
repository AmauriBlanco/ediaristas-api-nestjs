import { AvaliacaoRequestDto } from './dto/avaliacao-request.dto';
import { AvaliacaoResponseDto } from './dto/avaliacao-response';
import { Avaliacao } from './entities/avaliacao.entity';

export class AvaliacaoMapper {
  toModel(avaliacaoResquest: AvaliacaoRequestDto): Avaliacao {
    const avaliacao = new Avaliacao();
    avaliacao.nota = avaliacaoResquest.nota;
    avaliacao.descricao = avaliacaoResquest.descricao;
    return avaliacao;
  }

  toResponse(avaliacao: Avaliacao): AvaliacaoResponseDto {
    const avaliacaoResponse = new AvaliacaoResponseDto();
    avaliacaoResponse.descricao = avaliacao.descricao;
    avaliacaoResponse.nota = avaliacao.nota;
    avaliacaoResponse.nomeAvaliador = avaliacao.avaliador.nomeCompleto;
    if (!avaliacao.avaliador.fotoUsuario) {
      avaliacaoResponse.fotoAvaliador = null;
    } else {
      avaliacaoResponse.fotoAvaliador = avaliacao.avaliador.fotoUsuario.url;
    }

    return avaliacaoResponse;
  }
}
