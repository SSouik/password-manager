import { HttpClient } from '@angular/common/http';
import { fakeAsync, flush } from '@angular/core/testing';
import { GetPasswordsResponse, LoginResponse } from '@password-manager:types';
import { BrowserStorageService } from '@password-manager:ui:services';
import { of } from 'rxjs';

import { BFFService } from './bff.service';

describe('BFFService Tests', () => {
    const mockHttpClient = HttpClient.prototype;
    const mockBrowserStorageService = BrowserStorageService.prototype;
    let service: BFFService;

    beforeEach(() => {
        // Mock getTime to return 1000 so the token expiration is
        // 1000 for every test
        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(1000);

        service = new BFFService(mockHttpClient, mockBrowserStorageService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Login', () => {
        it('Sets the session in local storage when login is successful', fakeAsync(() => {
            mockBrowserStorageService.setItem = jest.fn();

            mockHttpClient.post = jest.fn().mockReturnValue(
                of(<LoginResponse>{
                    client: {
                        clientId: 'clientId',
                        login: 'login',
                    },
                    auth: {
                        token: 'token',
                        expiresIn: 3600,
                    },
                }),
            );

            service.login('login', 'password').subscribe({
                next: (response: LoginResponse) => {
                    expect(response.client.clientId).toBe('clientId');
                    expect(response.auth.token).toBe('token');
                    expect(response.auth.expiresIn).toBe(3600);

                    expect(mockBrowserStorageService.setItem).toBeCalledTimes(4);
                    expect(mockBrowserStorageService.setItem).toHaveBeenNthCalledWith(1, 'username', 'login');
                    expect(mockBrowserStorageService.setItem).toHaveBeenNthCalledWith(2, 'sessionId', 'clientId');
                    expect(mockBrowserStorageService.setItem).toHaveBeenNthCalledWith(3, 'sessionToken', 'token');
                    expect(mockBrowserStorageService.setItem).toHaveBeenNthCalledWith(
                        4,
                        'sessionTokenExpiration',
                        1000,
                    );
                },
            });

            flush();
        }));
    });

    describe('Get Passwords', () => {
        it('Gets the passwords for a client', fakeAsync(() => {
            mockHttpClient.get = jest.fn().mockReturnValue(
                of(<GetPasswordsResponse>{
                    passwords: [
                        {
                            passwordId: 'passwordId',
                            name: 'Name',
                            website: null,
                            login: 'Login',
                            value: 'password',
                            clientId: 'clientId',
                        },
                    ],
                }),
            );

            service.getPasswords('id').subscribe({
                next: (response: GetPasswordsResponse) => {
                    expect(response.passwords).toStrictEqual([
                        {
                            passwordId: 'passwordId',
                            name: 'Name',
                            website: null,
                            login: 'Login',
                            value: 'password',
                            clientId: 'clientId',
                        },
                    ]);
                },
            });

            flush();
        }));
    });
});
