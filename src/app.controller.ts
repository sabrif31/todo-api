import { Controller, Get } from '@nestjs/common'; // , Post, Request, UseGuards
import { AppService } from './app.service';
// import { LocalAuthGuard } from './auth/guards/local-auth.guard';
// import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  // private readonly authService: AuthService,
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  */
}
