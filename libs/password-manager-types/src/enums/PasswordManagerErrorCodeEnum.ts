export enum PasswordManagerErrorCodeEnum {
    // Bad Request Error codes
    BadRequest = 'PMBR001',
    LoginAlreadyExists = 'PMBR002',

    // Unauthorized Error codes
    Unauthorized = 'PMUA001',
    CredentialsDoNotMatch = 'PMUA002',
    IncorrectAnswer = 'PMUA003',

    // Forbidden Error codes
    Forbidden = 'PMFB001',
    NoToken = 'PMFB002',
    InvalidToken = 'PMFB003',
    TokenDoesNotBelongToClient = 'PMFB004',

    // Not Found Error codes
    NotFound = 'PMNF001',
    ClientNotFound = 'PMNF002',
    PasswordNotFound = 'PMNF003',
    QuestionNotFound = 'PMNF004',

    // Conflict Error codes
    Conflict = 'PMC001',

    // Internal Server Error codes
    InternalServerError = 'PMISE001',

    // Not Implemented Error codes
    NotImplemented = 'PMNI001',

    // Bad Gateway Error codes
    BadGateway = 'PMBG001',

    // Service Unavailable Error codes
    ServiceUnavailable = 'PMSU001',
    DynamoDBDown = 'PMSU002',
}
