import { FactoryProvider } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IConfigService } from '@password-manager:api:interfaces';
import { DependencyInjectionTokenEnum } from '@password-manager:api:types';
import {
    DynamoDBClient,
    DynamoDBConnection,
    DynamoDBCredentials,
    IDynamoDBClient,
} from '@password-manager:dynamodb-client';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.DYNAMODB_CLIENT,
    useFactory: (configService: IConfigService<AppConfig>): IDynamoDBClient => {
        return new DynamoDBClient(<DynamoDBConnection>{
            region: configService.get('region'),
            endpoint: configService.get('dynamodbEndpoint'),
            tablePrefix: `${configService.getEnvironment()}.`,
            credentials: <DynamoDBCredentials>{ accessKeyId: 'foo', secretAccessKey: 'bar' },
        });
    },
    inject: [DependencyInjectionTokenEnum.CONFIG_SERVICE],
};
