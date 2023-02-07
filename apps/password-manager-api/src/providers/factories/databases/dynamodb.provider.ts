import { FactoryProvider, InjectionToken } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import {
    DynamoDBClient,
    DynamoDBConnection,
    DynamoDBCredentials,
    IDynamoDBClient,
} from '@password-manager:dynamodb-client';

export const DYNAMODB_CLIENT: InjectionToken = 'DynamoDBClient';

export default <FactoryProvider>{
    provide: DYNAMODB_CLIENT,
    useFactory: (appConfigService: IAppConfigService<AppConfig>): IDynamoDBClient => {
        return new DynamoDBClient(<DynamoDBConnection>{
            region: appConfigService.get('region'),
            endpoint: appConfigService.get('dynamodbEndpoint'),
            tablePrefix: `${appConfigService.getEnvironment()}.`,
            credentials: <DynamoDBCredentials>{ accessKeyId: 'foo', secretAccessKey: 'bar' },
        });
    },
    inject: [APP_CONFIG_SERVICE],
};
