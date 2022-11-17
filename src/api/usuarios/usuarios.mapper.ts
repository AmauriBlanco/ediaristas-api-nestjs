import { Injectable } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { UsuarioApi } from './entities/usuario.entity';

@Injectable()
export class UsuarioMapper {
  toUsuarioRequestDto(usuarioDTO: UsuarioRequestDto): UsuarioApi {
    const usuario = new UsuarioApi();

    usuario.nomeCompleto = usuarioDTO.nomeCompleto;
    usuario.email = usuarioDTO.email;
    usuario.senha = usuarioDTO.password;
    usuario.tipoUsuario = usuarioDTO.tipoUsuario;
    usuario.cpf = usuarioDTO.cpf;
    usuario.nascimento = usuarioDTO.nascimento;
    usuario.telefone = usuarioDTO.telefone;
    usuario.chavePix = usuarioDTO.chavePix;
    usuario.reputacao = usuarioDTO.reputacao;

    return usuario;
  }

  toUsuarioResponseDto(usuario: UsuarioApi): UsuarioResponseDto {
    const usuarioDTO = new UsuarioResponseDto();

    usuarioDTO.id = usuario.id;
    usuarioDTO.nomeCompleto = usuario.nomeCompleto;
    usuarioDTO.email = usuario.email;
    usuarioDTO.tipoUsuario = usuario.tipoUsuario;
    usuarioDTO.cpf = usuario.cpf;
    usuarioDTO.nascimento = usuario.nascimento;
    usuarioDTO.telefone = usuario.telefone;
    usuarioDTO.chavePix = usuario.chavePix;

    return usuarioDTO;
  }
}
