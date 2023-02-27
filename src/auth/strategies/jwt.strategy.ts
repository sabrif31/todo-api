import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // jwtConstants.secret
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    return {
      id: payload.id,
      email: payload.email,
      lastName: payload.lastName,
      firstName: payload.firstName,
    };
  }
}
