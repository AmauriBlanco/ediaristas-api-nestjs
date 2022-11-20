import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioApi } from './entities/usuario.entity';
import { UsuarioMapper } from './usuarios.mapper';
import { UsuarioRepository } from './usuarios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioApi])],
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuarioMapper, UsuarioRepository],
})
export class UsuariosModule {}
