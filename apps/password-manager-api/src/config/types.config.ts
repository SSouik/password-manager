import { EnvironmentEnum } from '@password-manager:types';

export type AppConfig = {
    // App
    version: string;
    environment: EnvironmentEnum;
    region: string;
    commitSha: string;
    encryptionKey: string;

    // DynamoDB
    dynamodbEndpoint: string;
};

export type AppEnvironment = {
    // App
    VERSION: string;
    ENVIRONMENT: string;
    REGION: string;
    COMMIT_SHA: string;
    ENCRYPTION_KEY: string;

    // DynamoDB
    DYNAMODB_ENDPOINT: string;
};
