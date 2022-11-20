import type { CanActivate, ExecutionContext } from '@nestjs/common'

import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'secret',
    })
  }

  async validate(payload: any) {
    const { id, username, email } = payload
    return { id, username, email }
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    if (isPublic) return true
    // const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    // if (isPublic) return true
  }
}
