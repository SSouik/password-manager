import { Module } from '@nestjs/common';
import Controllers from '@password-manager:api:controllers';
import Providers from '@password-manager:api:providers';

@Module({
    imports: [],
    controllers: Controllers,
    providers: [...Providers],
})
export class AppModule {}
