import { Module } from '@nestjs/common';
import Providers from '@password-manager:api:providers';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, ...Providers],
})
export class AppModule {}
