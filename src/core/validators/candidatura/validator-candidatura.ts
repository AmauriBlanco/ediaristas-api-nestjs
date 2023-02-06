import { BadRequestException, Injectable } from '@nestjs/common';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status.enum';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

@Injectable()
export class ValidatorCandidatura {
  async validar(usuarioLogado: UsuarioApi, diaria: Diaria) {
    this.validarEnderecoCandidato(usuarioLogado);
    this.validarDuplicidadeCandidato(usuarioLogado, diaria);
    this.quantidadeCandidatos(diaria);
    this.validarStatusDiaria(diaria);
  }
  private validarStatusDiaria(diaria: Diaria) {
    if (diaria.status != DiariaStatus.PAGO) {
      throw new BadRequestException('Diária não está com status pago');
    }
  }
  private quantidadeCandidatos(diaria: Diaria) {
    const candidatos = diaria.candidatos,
      maximoCandidatos = 3;

    if (candidatos.length >= maximoCandidatos) {
      throw new BadRequestException(
        'Diaria possui número máximo de candidatos',
      );
    }
  }
  private validarDuplicidadeCandidato(
    usuarioLogado: UsuarioApi,
    diaria: Diaria,
  ) {
    const candidatos = diaria.candidatos;

    if (candidatos.find((user) => user.id === usuarioLogado.id)) {
      throw new BadRequestException(
        'Diarista já se candidatou para essa diária',
      );
    }
  }
  private validarEnderecoCandidato(usuarioLogado: UsuarioApi) {
    if (!usuarioLogado.endereco) {
      throw new BadRequestException('Diarista deve ter o endereço cadastrado');
    }
  }
}
