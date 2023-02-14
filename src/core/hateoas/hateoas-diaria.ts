import { Injectable } from '@nestjs/common';
import { ConfirmacaoPresencaController } from 'src/api/confirmacao-presenca/confirmacao-presenca.controller';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status.enum';
import { PagamentosController } from 'src/api/pagamentos/pagamentos.controller';
import TipoUsuario from 'src/api/usuarios/enum/tipo-usuario.enum';
import { HateoasBase } from './hateoas-base';
import { HateoasLinks } from './hateoas.interface';

@Injectable()
export class HateoasDiaria extends HateoasBase {
  gerarLinksHateos(tipoUsuario?: number, diaria?: Diaria): HateoasLinks[] {
    this.LINKS = [];
    const params = {
      id: diaria.id,
    };
    if (
      tipoUsuario === TipoUsuario.CLIENTE &&
      diaria.status === DiariaStatus.SEM_PAGAMENTO
    ) {
      this.adicionarLinks(
        'POST',
        'pagar_diaria',
        PagamentosController,
        PagamentosController.prototype.pagar,
        params,
      );
    }

    if (this.isAptaParaConfirmacaoPresenca(diaria, tipoUsuario)) {
      this.adicionarLinks(
        'PATCH',
        'confirmar_diarista',
        ConfirmacaoPresencaController,
        ConfirmacaoPresencaController.prototype.confirmacaoPresenca,
        params,
      );
    }

    return this.LINKS;
  }
  private isAptaParaConfirmacaoPresenca(diaria: Diaria, tipoUsuario: number) {
    const hoje = new Date(Date.now());
    if (
      tipoUsuario === TipoUsuario.CLIENTE &&
      diaria.status === DiariaStatus.CONFIRMADO &&
      diaria.dataAtendimento < hoje
    ) {
      return true;
    }
  }
}
