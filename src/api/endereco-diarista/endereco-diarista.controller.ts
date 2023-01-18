import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import TipoUsuario from '../usuarios/enum/tipo-usuario.enum';
import { EnderecoDiaristaRequestDto } from './dto/endereco-diarista-request.dto.ts';
import { EnderecoDiaristaService } from './endereco-diarista.service';

@Controller('api/usuarios')
export class EnderecoDiaristaController {
  constructor(
    private readonly enderecoDiaristaService: EnderecoDiaristaService,
  ) {}

  @Put('endereco')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.DIARISTA)
  atualizarEndereco(
    @Body() enderecoDiarista: EnderecoDiaristaRequestDto,
    @GetUser() usuarioLogado: UsuarioApi,
  ) {
    return this.enderecoDiaristaService.atualizarEndereco(
      enderecoDiarista,
      usuarioLogado,
    );
  }
}
