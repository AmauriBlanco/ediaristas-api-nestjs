import { Injectable } from '@nestjs/common';
import { UsuarioMapper } from './usuarios.mapper';
import { UsuarioRepository } from './usuarios.repository';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuarios/validator-password';
import { ValidatorUsuarioPix } from 'src/core/validators/usuarios/validator-usuario-pix';
import { Request } from 'express';
import { FotosService } from '../fotos/fotos.service';
import { MailService } from 'src/core/services/mail/mail.service';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { JwtPayload } from 'src/auth/strategies/jwt-payload.interface';

@Injectable()
export class UsuariosService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioMapper: UsuarioMapper,
    private validator: ValidatorPasswordConfirmation,
    private validatorPix: ValidatorUsuarioPix,
    private foto: FotosService,
    private mailService: MailService,
    private jwtTokens: JwtTokens,
  ) {}
  async cadastrar(
    UsuarioRequestDto: UsuarioRequestDto,
    file: Express.Multer.File,
    req: Request,
  ) {
    this.validator.validarConfirmacaoDeSenha(
      UsuarioRequestDto.password,
      UsuarioRequestDto.passwordConfirmation,
    );

    UsuarioRequestDto.chavePix =
      this.validatorPix.validarUsuarioPix(UsuarioRequestDto);

    const foto = await this.foto.salvar(file, req);
    const usuarioParaCadastrar = this.usuarioMapper.toUsuarioRequestDto(
      UsuarioRequestDto,
      foto,
    );

    usuarioParaCadastrar.reputacao = await this.calcularReputacaoMedia(
      UsuarioRequestDto.tipoUsuario,
    );

    const usuarioCadastrado = await this.usuarioRepository.repository.save(
      usuarioParaCadastrar,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usuarioCadastroDto =
      this.usuarioMapper.toUsuarioCadastroResponseDto(usuarioCadastrado);

    const { email } = usuarioCadastrado;
    const payload: JwtPayload = { email };
    usuarioCadastroDto.token = await this.jwtTokens.gerarTokens(payload);
    // await this.mailService.enviarEmailDeConfirmacao(usuarioCadatrado);

    return usuarioCadastroDto;
  }

  private async calcularReputacaoMedia(tipoUsuario: number): Promise<number> {
    let reputacaoMedia =
      await this.usuarioRepository.repository.getMediaReputacao(tipoUsuario);
    if (reputacaoMedia === null || reputacaoMedia === 0) {
      reputacaoMedia = 5;
    }
    return reputacaoMedia;
  }
}
