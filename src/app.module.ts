import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadesAtendidasModule } from './api/cidades-atendidas/cidades-atendidas.module';
import { DiaristasModule } from './api/diaristas/diaristas.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
