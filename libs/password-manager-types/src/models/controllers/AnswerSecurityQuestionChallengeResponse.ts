import { ResponseBase } from './ResponseBase';

import { AuthToken } from '../AuthToken';

export type AnswerSecurityQuestionChallengeResponse = ResponseBase & {
    clientId: string;
    auth: AuthToken;
};
