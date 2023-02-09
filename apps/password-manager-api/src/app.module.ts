import { join } from 'path';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import Controllers from '@password-manager:api:controllers';
import GlobalInterceptors from '@password-manager:api:interceptors';
import { LoggerContextMiddleware, TraceIdMiddleware } from '@password-manager:api:middleware';
import Providers from '@password-manager:api:providers';
import Repositories from '@password-manager:api:repositories';
import Services from '@password-manager:api:services';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'password-manager-ui'),
        }),
    ],
    controllers: Controllers,
    providers: [...GlobalInterceptors, ...Providers, ...Services, ...Repositories],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(TraceIdMiddleware, LoggerContextMiddleware).forRoutes('*');
    }
}
