import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPasswordsResponse, LoginRequest, LoginResponse } from '@password-manager:types';
import { BrowserStorageService } from '@password-manager:ui:services/browser-storage/browser-storage.service';
import { Observable, switchMap, take, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BFFService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly browserStorageService: BrowserStorageService,
    ) {}

    public login(login: string, password: string): Observable<LoginResponse> {
        const request = <LoginRequest>{
            login: login,
            password: password,
        };

        return this.httpClient.post<LoginResponse>('api/v1/login', request, { headers: this.buildHeaders() }).pipe(
            take(1),
            switchMap((response: LoginResponse) => {
                const expirationTimestamp = new Date(Date.now() + response.auth.expiresIn * 1000).getTime();

                this.browserStorageService.setItem('username', login);
                this.browserStorageService.setItem('sessionId', response.client.clientId);
                this.browserStorageService.setItem('sessionToken', response.auth.token);
                this.browserStorageService.setItem('sessionTokenExpiration', expirationTimestamp);

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
        return this.buildHeaders().set('Authorization', `Bearer ${this.browserStorageService.getItem('sessionToken')}`);
    }
}
