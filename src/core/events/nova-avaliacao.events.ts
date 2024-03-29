import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OnEvent } from '@nestjs/event-emitter/dist/decorators';
import { AvaliacaoRepository } from 'src/api/avaliacoes/avaliacao.repository';
import { Avaliacao } from 'src/api/avaliacoes/entities/avaliacao.entity';
import { DiariaRepository } from 'src/api/diarias/diarias.repository';
import DiariaStatus from 'src/api/diarias/enum/diaria-status.enum';
import { UsuarioRepository } from 'src/api/usuarios/usuarios.repository';

@Injectable()
export class NovaAvaliacaoEvents {
  constructor(
    private eventEmitter: EventEmitter2,
    private avaliacaoRepository: AvaliacaoRepository,
    private usuarioRepository: UsuarioRepository,
    private diariaRepository: DiariaRepository,
  ) {}

  NovaAvaliacaoEvent(avaliacao: Avaliacao) {
    this.eventEmitter.emit('avaliacao.created', avaliacao);
  }

  @OnEvent('avaliacao.created')
  SetNovaAvaliacao(payload: Avaliacao) {
    const avaliacao = payload;

    this.atualizarReputacaoAvaliado(avaliacao);
    this.atualizarStatusDaDiariaAvaliado(avaliacao);
  }

  private async atualizarStatusDaDiariaAvaliado(avaliacao: Avaliacao) {
    const diaria = avaliacao.diaria;

    if (
      await this.avaliacaoRepository.repository.isClienteAndDiaristaAvaliaramDiaria(
        diaria,
      )
    ) {
      diaria.status = DiariaStatus.AVALIADO;
      await this.diariaRepository.repository.save(diaria);
    }
  }

  private async atualizarReputacaoAvaliado(avaliacao: Avaliacao) {
    const avaliado = avaliacao.avaliado;
    const notaMedia =
      await this.avaliacaoRepository.repository.getAvaliacaoMedia(avaliado);

    avaliado.reputacao = notaMedia;
    await this.usuarioRepository.repository.save(avaliado);
  }
}
