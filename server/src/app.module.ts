import { Module } from '@nestjs/common';

import { ConfigModule } from './app/core/configs/config.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
