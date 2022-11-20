import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';
import { CpfJaExiste } from 'src/core/validators/usuarios/validator-cpf';
import { EmailJaExiste } from 'src/core/validators/usuarios/validator-email';
import { IdadeValida } from 'src/core/validators/usuarios/validator-idade';

export class UsuarioRequestDto {
  id: number;

  @Length(3, 255, {
    message: 'Nome Completo deve possuir entre 3 e 255 caracteres',
  })
  @Expose({ name: 'nome_completo' })
  nomeCompleto: string;

  @Length(3, 255, {
    message: 'Email deve possuir entre 3 e 255 caracteres',
  })
  @Validate(EmailJaExiste)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Expose({ name: 'password_confirmation' })
  passwordConfirmation: string;

  @IsNotEmpty()
  @Expose({ name: 'tipo_usuario' })
  tipoUsuario: number;

  @Length(11, 11, {
    message: 'CPF deve possuir 11 caracteres',
  })
  @Validate(CpfJaExiste)
  cpf: string;

  @IsOptional()
  reputacao: number;

  @IsDateString('', { message: 'Data de nascimento deve ser uma data válida.' })
  @Validate(IdadeValida)
  nascimento: Date;

  @Length(11, 11, {
    message: 'Telefone possuir 11 caracteres',
  })
  telefone: string;

  @IsOptional()
  @Expose({ name: 'chave_pix' })
  chavePix: string;
  //   fotoDocumento: Foto;
  //   fotoUsuario: Foto;
  //   endereco: EnderecoDiarista;
}
