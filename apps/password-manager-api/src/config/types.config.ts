import { EnvironmentEnum } from '@password-manager:types';

export type AppConfig = {
    // App
    version: string;
    environment: EnvironmentEnum;
    region: string;
    commitSha: string;
    appUrl: URL;

    // JWT
    jwtSecret: string;

    // Crypto
    encryptionKey: string;
    initializationVector: string;

    // DynamoDB
    dynamodbEndpoint: string;
};

export type AppEnvironment = {
    // App
    VERSION: string;
    ENVIRONMENT: string;
    REGION: string;
    COMMIT_SHA: string;
    APP_URL: string;

    // JWT
    JWT_SECRET: string;

    // Crypto
    ENCRYPTION_KEY: string;
    INITIALIZATION_VECTOR: string;

    // DynamoDB
    DYNAMODB_ENDPOINT: string;
};
