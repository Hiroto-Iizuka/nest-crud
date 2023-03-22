import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/authSignIn.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(dto: AuthSignInDto): Promise<any> {
    const user = await this.authService.signIn(dto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
