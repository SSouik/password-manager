import { Module } from '@nestjs/common';
import Controllers from '@password-manager:api:controllers';
import Providers from '@password-manager:api:providers';
import Services from '@password-manager:api:services';

@Module({
    imports: [],
    controllers: Controllers,
    providers: [...Providers, ...Services],
})
export class AppModule {}
