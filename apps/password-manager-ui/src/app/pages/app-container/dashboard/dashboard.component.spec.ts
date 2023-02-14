import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetPasswordsResponse } from '@password-manager:types';
import { Observable, of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent Tests', () => {
    let mockHttpClient: HttpClient;
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DashboardComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;

        mockHttpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should create the Dashboard Component Page', () => {
        expect(component).toBeTruthy();
    });

    // Tests need to be updated later when the page is refactored
    describe('Component Initialization', () => {
        it('Fetches passwords for the client on initialization', () => {
            mockHttpClient.get = jest.fn().mockReturnValue(
                of(<GetPasswordsResponse>{
                    statusCode: HttpStatusCode.Ok,
                    message: 'OK',
                    passwords: [
                        {
                            passwordId: 'id',
                            name: 'Foo',
                            website: null,
                            login: 'login',
                            value: 'password',
                        },
                    ],
                }),
            );

            component.ngOnInit();

            expect(mockHttpClient.get).toBeCalledTimes(1);
            expect(mockHttpClient.get).toBeCalledWith('/api/v1/clients/123/passwords');

            expect(component.message).toBe('');
            expect(component.passwords).toStrictEqual([
                {
                    passwordId: 'id',
                    name: 'Foo',
                    website: null,
                    login: 'login',
                    value: 'password',
                },
            ]);
        });

        it('Fetches passwords for the client on initialization but receives a 500', () => {
            mockHttpClient.get = jest.fn().mockReturnValue(
                new Observable((observer) =>
                    observer.error(
                        new HttpErrorResponse({
                            status: HttpStatusCode.InternalServerError,
                            statusText: 'Internal Server Error',
                            error: { message: 'Something broke' },
                        }),
                    ),
                ),
            );

            component.ngOnInit();

            expect(mockHttpClient.get).toBeCalledTimes(1);
            expect(mockHttpClient.get).toBeCalledWith('/api/v1/clients/123/passwords');

            expect(component.message).toBe('Getting passwords failed with: 500 - Something broke');
            expect(component.passwords).toStrictEqual([]);
        });
    });
});
