import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import TipoUsuario from 'src/api/usuarios/enum/tipo-usuario.enum';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async enviarEmailDeConfirmacao(usuario: UsuarioApi) {
    let tipoUsuario = false;

    if (usuario.tipoUsuario == TipoUsuario.CLIENTE) {
      tipoUsuario = true;
    }

    await this.mailService.sendMail({
      to: usuario.email,
      from: '"E-Diaristas" <ediaristas@suporte.com>',
      subject: 'Bem vindo(a) ao E-Diaristas',
      template: 'confirmation',
      context: {
        nome: usuario.nomeCompleto,
        tipoUsuario: tipoUsuario,
      },
    });
  }
}
