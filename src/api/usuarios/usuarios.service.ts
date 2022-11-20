import { Injectable } from '@nestjs/common';
import { UsuarioMapper } from './usuarios.mapper';
import { UsuarioRepository } from './usuarios.repository';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuarios/validator-password';

@Injectable()
export class UsuariosService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioMapper: UsuarioMapper,
    private validator: ValidatorPasswordConfirmation,
  ) {}
  async cadastrar(UsuarioRequestDto: UsuarioRequestDto) {
    this.validator.validarConfirmacaoDeSenha(
      UsuarioRequestDto.password,
      UsuarioRequestDto.passwordConfirmation,
    );
    const usuarioParaCadastrar =
      this.usuarioMapper.toUsuarioRequestDto(UsuarioRequestDto);

    usuarioParaCadastrar.senha = await usuarioParaCadastrar.setPassword(
      UsuarioRequestDto.password,
    );
    const usuarioCadatrado = await this.usuarioRepository.repository.save(
      usuarioParaCadastrar,
    );

    return this.usuarioMapper.toUsuarioResponseDto(usuarioCadatrado);
  }
}
