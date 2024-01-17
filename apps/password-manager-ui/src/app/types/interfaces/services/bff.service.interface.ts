import { GetPasswordsResponse, LoginResponse } from '@password-manager:types';
import { Observable } from 'rxjs';

export interface IBFFService {
    login(login: string, password: string): Observable<LoginResponse>;
    getPasswords(clientId: string): Observable<GetPasswordsResponse>;
}
