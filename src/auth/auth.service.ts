import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  // Sign in user
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    //  Extract username and password from DTO
    const { username, password } = authCredentialsDto;

    //  Find user by username
    const user = await this.usersRepository.findOne({ username });

    //  Check if user exists
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      //  Return JWT
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    }
    // If user does not exist or password is incorrect
    else {
      throw new UnauthorizedException('Please Check your login credentials');
    }
  }
}
