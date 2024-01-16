import { join } from 'path';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import Controllers from '@password-manager:api:controllers';
import Filters from '@password-manager:api:filters';
import GlobalInterceptors from '@password-manager:api:interceptors';
import { LogContextMiddleware } from '@password-manager:api:middleware';
import Providers from '@password-manager:api:providers';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../..', 'dist/apps/password-manager-ui'),
        }),
    ],
    controllers: Controllers,
    providers: [...GlobalInterceptors, ...Filters, ...Providers],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogContextMiddleware).forRoutes('*');
    }
}
