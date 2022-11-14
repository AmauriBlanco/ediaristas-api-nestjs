import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadesAtendidasModule } from './api/cidades-atendidas/cidades-atendidas.module';
import { EnderecoModule } from './api/consulta-endereco/enredeco.module';
import { DiaristasModule } from './api/diaristas/diaristas.module';
import { ServicosModule } from './api/servicos/servicos.module';
import { UsuariosModule } from './api/usuarios/usuarios.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './database/typeorm-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsuariosModule,
    CidadesAtendidasModule,
    DiaristasModule,
    EnderecoModule,
    ServicosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
