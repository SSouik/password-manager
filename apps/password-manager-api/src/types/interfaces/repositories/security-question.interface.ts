import { SecurityQuestion } from '@password-manager:types';

export interface ISecurityQuestionRepository {
    getSecurityQuestionById(questionId: string): Promise<SecurityQuestion>;
    getSecurityQuestionByLogin(login: string): Promise<SecurityQuestion>;
    createSecurityQuestion(securityQuestion: SecurityQuestion): Promise<SecurityQuestion>;
    updateSecurityQuestion(securityQuestion: SecurityQuestion): Promise<void>;
}
