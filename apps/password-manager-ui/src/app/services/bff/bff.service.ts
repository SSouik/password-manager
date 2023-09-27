import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPasswordsResponse, LoginRequest, LoginResponse } from '@password-manager:types';
import { Observable, switchMap, take, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BFFService {
    constructor(private readonly httpClient: HttpClient) {}

    public login(login: string, password: string): Observable<LoginResponse> {
        const request = <LoginRequest>{
            login: login,
            password: password,
        };

        return this.httpClient.post<LoginResponse>('api/v1/login', request, { headers: this.buildHeaders() }).pipe(
            take(1),
            switchMap((response: LoginResponse) => {
                const expirationTimestamp = new Date(Date.now() + response.auth.expiresIn * 1000).getTime().toString();

                localStorage.setItem('username', login);
                localStorage.setItem('sessionId', response.client.clientId);
                localStorage.setItem('sessionToken', response.auth.token);
                localStorage.setItem('sessionTokenExpiration', expirationTimestamp);

                return of(response);
            }),
        );
    }

    public getPasswords(clientId: string): Observable<GetPasswordsResponse> {
        return this.httpClient
            .get<GetPasswordsResponse>(`/api/v1/clients/${clientId}/passwords`, {
                headers: this.buildHeadersWithAuth(),
            })
            .pipe(take(1));
    }

    private buildHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('User-Agent', 'Password Manager UI');
    }

    private buildHeadersWithAuth(): HttpHeaders {
        return this.buildHeaders().set('Authorization', `Bearer ${localStorage.getItem('sessionToken')}`);
    }
}
