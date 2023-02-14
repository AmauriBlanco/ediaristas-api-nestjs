import { DistanciaResponseDto } from './dto/distancia-reponse.dto';

export abstract class ConsultaDistanciaCep {
  abstract calcularDistanciaEntreDoisCeps(
    origem: string,
    destino: string,
  ): Promise<DistanciaResponseDto>;
}
