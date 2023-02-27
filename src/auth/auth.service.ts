import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.userGet(email);
    if (user && user.password === password) {
      // bcrypt , encodage
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      accessToken: 'fake-token', // this.jwtService.sign(payload)
    };
  }
}
