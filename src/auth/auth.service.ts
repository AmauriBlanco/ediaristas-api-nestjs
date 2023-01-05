import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UsuarioRepository } from 'src/api/usuarios/usuarios.repository';
import { UsuarioAuthDto } from './dtos/usuario-auth.dto';
import { JwtPayload } from './strategies/jwt-payload.interface';
import { JwtTokens } from './strategies/jwt-tokens';
import { ITokens } from './strategies/jwt-tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtTokens: JwtTokens,
  ) {}

  async signIn(UsuarioAuthDto: UsuarioAuthDto): Promise<ITokens> {
    const { email, password } = UsuarioAuthDto;
    const usuario = await this.usuarioRepository.repository.findOneBy({
      email: email,
    });

    if (usuario && (await bcrypt.compare(password, usuario.senha))) {
      const payload: JwtPayload = { email };
      return await this.jwtTokens.gerarTokens(payload);
    } else {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
  }

  async reautenticar(req: Request) {
    const email = await this.jwtTokens.verificarRefreshToken(req);
    const payload: JwtPayload = { email };
    return this.jwtTokens.gerarTokens(payload);
  }
}
