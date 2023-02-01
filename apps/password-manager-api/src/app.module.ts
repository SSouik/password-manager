import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import Controllers from '@password-manager:api:controllers';
import { LoggerContextMiddleware, TraceIdMiddleware } from '@password-manager:api:middleware';
import Providers from '@password-manager:api:providers';
import Services from '@password-manager:api:services';

@Module({
    imports: [],
    controllers: Controllers,
    providers: [...Providers, ...Services],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(TraceIdMiddleware, LoggerContextMiddleware).forRoutes('*');
    }
}
