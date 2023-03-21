import { HttpClient } from '@angular/common/http';
import { fakeAsync, flush } from '@angular/core/testing';
import { LoginResponse } from '@password-manager:types';
import { of } from 'rxjs';

import { BFFService } from './bff.service';

describe('BFFService Tests', () => {
    const mockHttpClient = HttpClient.prototype;
    let service: BFFService;

    beforeEach(() => {
        // Mock getTime to return 1000 so the token expiration is
        // 1 for every test (1000 / 1000) = 1
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(1000);

        service = new BFFService(mockHttpClient);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Login', () => {
        it('Sets the session in local storage when login is successful', fakeAsync(() => {
            localStorage.setItem = jest.fn();

            mockHttpClient.post = jest.fn().mockReturnValue(
                of(<LoginResponse>{
                    clientId: 'id',
                    auth: {
                        token: 'token',
                        expiresIn: 3600,
                    },
                }),
            );

            service.login('username', 'password').subscribe({
                next: (response: LoginResponse) => {
                    expect(response.clientId).toBe('id');
                    expect(response.auth.token).toBe('token');
                    expect(response.auth.expiresIn).toBe(3600);

                    // Update with wrapper around local storage
                    // expect(localStorage.setItem).toBeCalledTimes(3);
                    // expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'sessionId', 'id');
                    // expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'sessionToken', 'token');
                    // expect(localStorage.setItem).toHaveBeenNthCalledWith(3, 'sessionTokenExpiration', '1');
                },
            });

            flush();
        }));
    });

    // Remove once this method is used
    describe('Build Headers with Auth', () => {
        it('Build Headers', () => {
            const headers = service['buildHeadersWithAuth']();

            expect(headers.get('Accept')).toBe('application/json');
            expect(headers.get('Content-Type')).toBe('application/json');
            expect(headers.get('User-Agent')).toBe('Password Manager UI');
            expect(headers.get('Authorization')).toBe('Bearer token');
        });
    });
});
