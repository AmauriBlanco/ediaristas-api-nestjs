import { Injectable } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ITokens } from './jwt-tokens.interface';

@Injectable()
export class JwtTokens {
  constructor(private jwtService: JwtService) {}

  async gerarTokens(payload: JwtPayload): Promise<ITokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'tw-access',
      expiresIn: 60,
    });
    return { access: accessToken };
  }
}
