import { Injectable } from '@nestjs/common';
import { DiariasController } from 'src/api/diarias/diarias.controller';
import TipoUsuario from 'src/api/usuarios/enum/tipo-usuario.enum';
import { HateoasBase } from './hateoas-base';
import { HateoasLinks } from './hateoas.interface';

@Injectable()
export class HateoasUsuario extends HateoasBase {
  gerarLinksHateos(tipoUsuario?: number): HateoasLinks[] {
    this.LINKS = [];

    if (tipoUsuario == TipoUsuario.CLIENTE) {
      this.adicionarLinks(
        'POST',
        'cadastrar_diaria',
        DiariasController,
        DiariasController.prototype.cadastrar,
      );
    }
    return this.LINKS;
  }
}
