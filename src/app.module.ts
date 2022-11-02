import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotosModule } from './fotos/fotos.module';

@Module({
  imports: [FotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
