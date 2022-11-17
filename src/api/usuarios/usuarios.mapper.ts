import { Injectable } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
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
}
