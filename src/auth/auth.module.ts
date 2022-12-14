import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UsuarioApi])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
