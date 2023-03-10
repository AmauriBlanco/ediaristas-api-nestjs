import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
import { UsuariosService } from './usuarios.service';
import { Request } from 'express';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import multerConfigProfile from './multer-config';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UsuarioApi } from './entities/usuario.entity';
import multerConfig from './multer-config';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private hateoas: HateoasUsuario,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto_documento', multerConfig))
  async cadastrar(
    @Body() usuarioRequestDto: UsuarioRequestDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const usuarioCadastrado = await this.usuariosService.cadastrar(
      usuarioRequestDto,
      file,
      req,
    );
    usuarioCadastrado.links = this.hateoas.gerarLinksHateos(
      usuarioRequestDto.tipoUsuario,
    );
    return usuarioCadastrado;
  }

  @Post('foto')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('foto_usuario', multerConfigProfile))
  async atualizarFotoUsuario(
    @GetUser() usuarioLogado: UsuarioApi,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return await this.usuariosService.atualizarFotoUsuario(
      file,
      usuarioLogado,
      req,
    );
  }
}
