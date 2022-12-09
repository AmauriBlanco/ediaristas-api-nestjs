import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioApi } from './entities/usuario.entity';
import { UsuarioMapper } from './usuarios.mapper';
import { UsuarioRepository } from './usuarios.repository';
import { EmailJaExiste } from 'src/core/validators/usuarios/validator-email';
import { CpfJaExiste } from 'src/core/validators/usuarios/validator-cpf';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuarios/validator-password';
import { ChavePixJaExiste } from 'src/core/validators/usuarios/validator-pix';
import { ValidatorUsuarioPix } from 'src/core/validators/usuarios/validator-usuario-pix';
import { Foto } from '../fotos/entities/foto.entity';
import { FotosService } from '../fotos/fotos.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioApi, Foto])],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UsuarioMapper,
    UsuarioRepository,
    EmailJaExiste,
    CpfJaExiste,
    ValidatorPasswordConfirmation,
    ChavePixJaExiste,
    ValidatorUsuarioPix,
    FotosService,
  ],
})
export class UsuariosModule {}
