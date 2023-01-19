import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import Providers from '@password-manager:api:providers';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ...Providers],
})
export class AppModule {}
