import {
  Body,
  Controller,
  Headers,
  Ip,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') browser: string,
  ) {
    return this.authService.login(dto, ip, browser ?? '');
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(
    @Request() req: { user: { nro_esclf: string } },
    @Ip() ip: string,
    @Headers('user-agent') browser: string,
  ) {
    return this.authService.logout(req.user.nro_esclf, ip, browser ?? '');
  }
}
