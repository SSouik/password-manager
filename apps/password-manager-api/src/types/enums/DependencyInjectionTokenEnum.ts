export enum DependencyInjectionTokenEnum {
    /* Factories */
    // Builders
    JWT_BUILDER = 'JwtBuilder',

    // Crypto
    CRYPTO = 'Crypto',

    // Databases
    DYNAMODB_CLIENT = 'DynamoDBClient',

    // Logger
    LOG_MESSAGE_FACTORY = 'LogMessageFactory',
    LOGGER = 'Logger',

    // Repositories
    CLIENT_REPOSITORY = 'ClientRepository',
    PASSWORD_REPOSITORY = 'PasswordRepository',

    // Services
    AUTH_SERVICE = 'AuthService',
    CLIENT_SERVICE = 'ClientService',
    CONFIG_SERVICE = 'ConfigService',
    HEALTH_CHECK_SERVICE = 'HealthCheckService',
    JWT_SERVICE = 'JWTService',
    PASSWORD_SERVICE = 'PasswordService',

    /* Values */
    // Config
    APP_CONFIG = 'AppConfig',
}
