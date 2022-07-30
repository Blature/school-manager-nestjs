import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-in.dto';
import { AuthCredentialsDto } from './dto/auth-credentials-up.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body()
    authCredentialsSignInDto: AuthCredentialsSignInDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsSignInDto);
  }
}
