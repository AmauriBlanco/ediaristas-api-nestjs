import { Injectable } from '@nestjs/common';
import { UsuarioMapper } from './usuarios.mapper';
import { UsuarioRepository } from './usuarios.repository';
import { UsuarioRequestDto } from './dto/usuario-request.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioMapper: UsuarioMapper,
  ) {}
  async cadastrar(UsuarioRequestDto: UsuarioRequestDto) {
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
