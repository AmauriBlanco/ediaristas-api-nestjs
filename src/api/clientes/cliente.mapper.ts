import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { ClienteResponseDto } from './dto/cliente-response.dto';

export class ClienteMapper {
  toResponse(usuario: UsuarioApi): ClienteResponseDto {
    const ClienteDto = new ClienteResponseDto();

    ClienteDto.id = usuario.id;
    ClienteDto.nascimento = usuario.nascimento;
    ClienteDto.nomeCompleto = usuario.nomeCompleto;
    ClienteDto.reputacao = usuario.reputacao;
    ClienteDto.telefone = usuario.telefone;
    ClienteDto.tipoUsuario = usuario.tipoUsuario;

    if (!usuario.fotoUsuario) {
      ClienteDto.fotoUsuário = null;
    } else {
      ClienteDto.fotoUsuário = usuario.fotoUsuario.url;
    }

    return ClienteDto;
  }
}
