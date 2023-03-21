import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '@password-manager:types';
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
                const date = new Date();
                date.setSeconds(date.getSeconds() + response.auth.expiresIn);
                const expirationTimestamp = Math.floor(date.getTime() / 1000).toString();

                localStorage.setItem('sessionId', response.clientId);
                localStorage.setItem('sessionToken', response.auth.token);
                localStorage.setItem('sessionTokenExpiration', expirationTimestamp);

                return of(response);
            }),
        );
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
