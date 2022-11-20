import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
import { UsuariosService } from './usuarios.service';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async cadastrar(@Body() usuarioRequestDtio: UsuarioRequestDto) {
    return await this.usuariosService.cadastrar(usuarioRequestDtio);
  }
}
