import { SecurityQuestion } from '@password-manager:types';

export interface ISecurityQuestionRepository {
    getSecurityQuestionById(quiestionId: string): Promise<SecurityQuestion>;
    createSecurityQuestion(securityQuestion: SecurityQuestion): Promise<SecurityQuestion>;
    updateSecurityQuestion(securityQuestion: SecurityQuestion): Promise<void>;
}
