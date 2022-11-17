import { Controller, Get } from '@nestjs/common';
import { HateoasIndex } from 'src/core/hateoas/hateoas-index';

@Controller('api')
export class ApiController {
  constructor(private hateoas: HateoasIndex) {}

  @Get()
  index() {
    return { links: this.hateoas.gerarLinksHateos() };
  }
}
