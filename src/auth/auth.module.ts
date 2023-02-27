import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthMutationsResolver } from './resolvers/auth.mutations.resolver';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, AuthMutationsResolver, LocalStrategy],
})
export class AuthModule {}
