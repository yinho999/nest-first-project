import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    //   Inject the UsersRepository
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      //  Extract the JWT from the request header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //  The secret key used to sign the JWT, same as the secret key used in the auth.module.ts
      secretOrKey: 'secretKey',
    });
  }

  // The validate function is called when the JWT is extracted from the request header
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
