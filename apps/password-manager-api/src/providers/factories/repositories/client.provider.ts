import { FactoryProvider } from '@nestjs/common';
import { ClientRepository } from '@password-manager:api:repositories';
import { DependencyInjectionTokenEnum, IClientRepository } from '@password-manager:api:types';
import { IDynamoDBClient } from '@password-manager:dynamodb-client';
import { ILogger } from '@password-manager:logger';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.CLIENT_REPOSITORY,
    useFactory: (logger: ILogger, dynamoDBClient: IDynamoDBClient): IClientRepository => {
        return new ClientRepository(logger, dynamoDBClient);
    },
    inject: [DependencyInjectionTokenEnum.LOGGER, DependencyInjectionTokenEnum.DYNAMODB_CLIENT],
};
