import { Injectable } from '@nestjs/common';
import { ServicoResponse } from './dto/servico-response.dto';
import { Servico } from './entities/servico.entity';

@Injectable()
export class ServicoMapper {
  toServicoReponseDto(servico: Servico): ServicoResponse {
    const servicoDTO = new ServicoResponse();
    servicoDTO.id = servico.id;
    servicoDTO.nome = servico.nome;
    servicoDTO.valorMinimo = servico.valorMinimo;
    servicoDTO.quantidadeHoras = servico.quantidadeHoras;
    servicoDTO.porcentagem = servico.porcentagem;
    servicoDTO.valorQuarto = servico.valorQuarto;
    servicoDTO.horasQuarto = servico.horasQuarto;
    servicoDTO.valorSala = servico.valorSala;
    servicoDTO.horasSala = servico.horasSala;
    servicoDTO.valorBanheiro = servico.valorBanheiro;
    servicoDTO.horasBanheiro = servico.horasBanheiro;
    servicoDTO.valorCozinha = servico.valorCozinha;
    servicoDTO.horasCozinha = servico.horasCozinha;
    servicoDTO.valorQuintal = servico.valorQuintal;
    servicoDTO.horasQuintal = servico.horasQuintal;
    servicoDTO.valorOutros = servico.valorOutros;
    servicoDTO.horasOutros = servico.horasOutros;
    servicoDTO.icone = servico.icone;
    servicoDTO.posicao = servico.posicao;
    return servicoDTO;
  }
}
