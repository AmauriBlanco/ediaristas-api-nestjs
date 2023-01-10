import { Expose } from 'class-transformer';
import { ClienteResponseDto } from 'src/api/clientes/dto/cliente-response.dto';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

export class DiariaResponseDto {
  id: number;

  status: number;

  @Expose({ name: 'data_atendimento' })
  dataAtendimento: Date;

  @Expose({ name: 'tempo_atendimento' })
  tempoAtendimento: number;

  preco: number;

  logradouro: string;

  numero: number;

  bairro: string;

  complemento: string;

  cidade: string;

  estado: string;

  cep: string;

  @Expose({ name: 'codigo_ibge' })
  codigoIbge: string;

  @Expose({ name: 'quatidade_quartos' })
  quantidadeQuartos: number;

  @Expose({ name: 'quatidade_salas' })
  quantidadeSalas: number;

  @Expose({ name: 'quatidade_cozinhas' })
  quantidadeCozinhas: number;

  @Expose({ name: 'quatidade_banheiros' })
  quantidadeBanheiros: number;

  @Expose({ name: 'quatidade_quintais' })
  quantidadeQuintais: number;

  @Expose({ name: 'quatidade_outros' })
  quantidadeOutros: number;

  observacoes: string;

  @Expose({ name: 'motivo_cancelamento' })
  motivoCancelamento: string;

  servico: number;

  @Expose({ name: 'nome_servico' })
  nomeServico: string;

  cliente: ClienteResponseDto;

  diarista: UsuarioApi;

  createdAt: Date;

  updateAt: Date;

  valorComissao: number;
}
