import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProvider } from './users.provider';

@Module({
  controllers: [UserController],
  providers: [UsersService, UsersProvider],
})
export class UsersModule {}
