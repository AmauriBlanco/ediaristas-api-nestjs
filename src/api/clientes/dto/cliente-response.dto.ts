import { Expose } from 'class-transformer';

export class ClienteResponseDto {
  id: number;

  @Expose({ name: 'nome_completo' })
  nomeCompleto: string;

  nascimento: Date;

  @Expose({ name: 'foto_usuario' })
  fotoUsuário: string;

  telefone: string;

  @Expose({ name: 'tipou_usuario' })
  tipoUsuario: number;

  reputacao: number;
}
