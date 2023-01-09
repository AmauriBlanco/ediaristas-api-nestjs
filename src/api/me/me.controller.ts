import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Controller('api/me')
export class MeController {
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async me(@GetUser() usuario: UsuarioApi): Promise<UsuarioApi> {
    return usuario;
  }
}
