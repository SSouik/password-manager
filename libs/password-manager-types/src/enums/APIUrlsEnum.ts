export enum APIUrlsEnum {
    // Public
    HealthCheck = 'healthcheck',
    Login = 'login',
    GetSecurityQuestionChallenge = 'challenge/:login/security-question',
    AnswerSecurityQuestionChallenge = 'challenge/:login/security-question/answer',

    // Private
    GetPasswords = 'clients/:clientId/passwords',
    CreatePassword = 'clients/:clientId/passwords',
    DeletePassword = 'clients/:clientId/passwords/:passwordId',
    UpdatePassword = 'clients/:clientId/passwords/:passwordId',
}
