import { FactoryProvider } from '@nestjs/common';
import { PasswordRepository } from '@password-manager:api:repositories';
import { DependencyInjectionTokenEnum, IPasswordRepository } from '@password-manager:api:types';
import { IDynamoDBClient } from '@password-manager:dynamodb-client';
import { ILogger } from '@password-manager:logger';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.PASSWORD_REPOSITORY,
    useFactory: (logger: ILogger, dynamoDBClient: IDynamoDBClient): IPasswordRepository => {
        return new PasswordRepository(logger, dynamoDBClient);
    },
    inject: [DependencyInjectionTokenEnum.LOGGER, DependencyInjectionTokenEnum.DYNAMODB_CLIENT],
};
