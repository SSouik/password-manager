export enum APIUrlsEnum {
    // Public
    HealthCheck = 'healthcheck',
    Login = 'login',

    // Private
    GetPasswords = 'clients/:clientId/passwords',
    CreatePassword = 'clients/:clientId/passwords',
    DeletePassword = '/clients/:clientId/passwords/:passwordId',
}
