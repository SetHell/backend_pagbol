import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type UsuarioJwt = {
  nro_esclf: string;
  CI: string;
  grado: string;
};

type JwtPayload = {
  sub: string;
  nro_esclf: string;
  CI: string;
  grado: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET no configurado en backend/.env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): UsuarioJwt {
    return {
      nro_esclf: payload.nro_esclf,
      CI: payload.CI,
      grado: payload.grado,
    };
  }
}
