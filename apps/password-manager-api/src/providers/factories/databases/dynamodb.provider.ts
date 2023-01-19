import { FactoryProvider, InjectionToken } from '@nestjs/common';
import { DynamoDBClient, DynamoDBConnection } from '@password-manager:dynamodb-client';

export const DYNAMODB_CLIENT: InjectionToken = 'DynamoDBClient';

export default <FactoryProvider> {
    provide: DYNAMODB_CLIENT,
    useFactory: () => {
        // Update to use a dynamic config
        const config = <DynamoDBConnection> {
            region: 'us-east-2',
            endpoint: 'http://localhost:7777',
            tablePrefix: 'local.',
        };

        return new DynamoDBClient(config);
    },
};
