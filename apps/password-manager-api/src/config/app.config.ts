import { ApplicationConfig } from '@password-manager:config';
import { EnvironmentEnum } from '@password-manager:types';
import * as dotenv from 'dotenv';

import { AppConfig, AppEnvironment } from './types.config';

dotenv.config();

const config = new ApplicationConfig<AppConfig, AppEnvironment>(process.env);

// App
config.map('version', 'VERSION').parse(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../../../../package.json').version;
});

config
    .map('environment', 'ENVIRONMENT')
    .withDefaultValue(EnvironmentEnum.Local)
    .parse((environment: string | undefined) => {
        return environment as EnvironmentEnum;
    });

config.map('region', 'REGION').withDefaultValue('us-west-1');

config.map('commitSha', 'COMMIT_SHA').withDefaultValue('commitSha');

config
    .map('appUrl', 'APP_URL')
    .withDefaultValue(new URL('https://test.passwordmanager.com'))
    .parse((value: string | undefined) => new URL(value));

// JWT
config.map('jwtSecret', 'JWT_SECRET');

// Crypto
config.map('encryptionKey', 'ENCRYPTION_KEY');

config.map('initializationVector', 'INITIALIZATION_VECTOR');

// DynamoDB
config.map('dynamodbEndpoint', 'DYNAMODB_ENDPOINT').withDefaultValue('http://dynamo:7777');

export const appConfig = config;
