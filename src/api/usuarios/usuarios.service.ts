import { Injectable } from '@nestjs/common';
import { UsuarioMapper } from './usuarios.mapper';
import { UsuarioRepository } from './usuarios.repository';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuarios/validator-password';
import { ValidatorUsuarioPix } from 'src/core/validators/usuarios/validator-usuario-pix';
import { Request } from 'express';
import { FotosService } from '../fotos/fotos.service';

@Injectable()
export class UsuariosService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioMapper: UsuarioMapper,
    private validator: ValidatorPasswordConfirmation,
    private validatorPix: ValidatorUsuarioPix,
    private foto: FotosService,
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

    usuarioParaCadastrar.senha = await usuarioParaCadastrar.setPassword(
      UsuarioRequestDto.password,
    );
    const usuarioCadatrado = await this.usuarioRepository.repository.save(
      usuarioParaCadastrar,
    );

    return this.usuarioMapper.toUsuarioResponseDto(usuarioCadatrado);
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
