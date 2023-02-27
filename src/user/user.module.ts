import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserMutationsResolver } from './resolvers/user.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserMutationsResolver],
  exports: [UserService],
})
export class UserModule {}
