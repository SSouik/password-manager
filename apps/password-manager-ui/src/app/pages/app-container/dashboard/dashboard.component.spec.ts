import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GetPasswordsResponse, UIUrlsEnum } from '@password-manager:types';
import { BFFService } from '@password-manager:ui:services/bff/bff.service';
import { Observable, of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import PageConfig from './dashboard.component.config';

describe('DashboardComponent Tests', () => {
    let mockRouter: Router;
    let mockBFFService: BFFService;
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, RouterModule, HttpClientTestingModule],
            declarations: [DashboardComponent],
            providers: [BFFService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;

        mockRouter = TestBed.inject(Router);
        mockBFFService = TestBed.inject(BFFService);

        mockRouter.navigateByUrl = jest.fn();
    });

    afterEach(() => {
        window.localStorage.clear();
        jest.resetAllMocks();
    });

    it('Should create the Dashboard Component Page', () => {
        expect(component).toBeTruthy();
    });

    describe('Component Initialization', () => {
        it('Fetches passwords for the client on initialization', () => {
            window.localStorage.setItem('sessionId', 'id');

            mockBFFService.getPasswords = jest.fn().mockReturnValue(
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
                            clientId: 'id',
                        },
                    ],
                }),
            );

            expect(component.page.isLoading).toBeTruthy();

            component.ngOnInit();

            expect(mockBFFService.getPasswords).toBeCalledTimes(1);
            expect(mockBFFService.getPasswords).toBeCalledWith('id');

            expect(component.page.passwordEntries.pop()?.password).toStrictEqual({
                passwordId: 'id',
                name: 'Foo',
                website: null,
                login: 'login',
                value: 'password',
                clientId: 'id',
            });

            expect(component.page.banner.show).toBeFalsy();
            expect(component.page.isLoading).toBeFalsy();
        });

        it('Fetches passwords for the client on initialization but receives a 404', () => {
            window.localStorage.setItem('sessionId', 'id');

            mockBFFService.getPasswords = jest.fn().mockReturnValue(
                new Observable((observer) =>
                    observer.error(
                        new HttpErrorResponse({
                            status: HttpStatusCode.NotFound,
                            statusText: 'Not Found',
                            error: { message: 'Not found' },
                        }),
                    ),
                ),
            );

            expect(component.page.isLoading).toBeTruthy();

            component.ngOnInit();

            expect(mockBFFService.getPasswords).toBeCalledTimes(1);
            expect(mockBFFService.getPasswords).toBeCalledWith('id');

            expect(component.page.passwordEntries).toStrictEqual([]);

            expect(component.page.banner).toStrictEqual({
                show: true,
                title: PageConfig.banner.createPassword.title,
                message: PageConfig.banner.createPassword.message,
                variant: PageConfig.banner.createPassword.variant,
                button: {
                    label: PageConfig.banner.createPassword.button.label,
                    click: expect.anything(),
                },
            });

            expect(component.page.isLoading).toBeFalsy();
        });

        it('Fetches passwords for the client on initialization but receives a 500', () => {
            mockBFFService.getPasswords = jest.fn().mockReturnValue(
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

            expect(component.page.isLoading).toBeTruthy();

            component.ngOnInit();

            expect(mockBFFService.getPasswords).toBeCalledTimes(1);
            expect(mockBFFService.getPasswords).toBeCalledWith('');

            expect(component.page.passwordEntries).toStrictEqual([]);

            expect(component.page.banner).toStrictEqual({
                show: true,
                title: PageConfig.banner.error.title,
                message: PageConfig.banner.error.message,
                variant: PageConfig.banner.error.variant,
                button: {
                    label: PageConfig.banner.error.button.label,
                    click: expect.anything(),
                },
            });

            expect(component.page.isLoading).toBeFalsy();
        });
    });

    describe('Go to Create Password Page', () => {
        it('Navigates to the create password page', () => {
            component.goToCreatePasswordPage();

            expect(mockRouter.navigateByUrl).toBeCalledTimes(1);
            expect(mockRouter.navigateByUrl).toBeCalledWith(UIUrlsEnum.CreatePassword);
        });
    });

    describe('Close Banner', () => {
        it('Closes the banner', () => {
            component.page.banner.show = true;

            expect(component.page.banner.show).toBeTruthy();

            component.closeBanner();

            expect(component.page.banner.show).toBeFalsy();
        });
    });
});
