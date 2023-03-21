import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse, UIUrlsEnum } from '@password-manager:types';
import BFFProvider, { BFFService } from '@password-manager:ui:services';
import { Observable, of } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginErrorsEnum } from './LoginErrorsEnum';

describe('LoginComponent Tests', () => {
    let mockRouter: Router;
    let mockBFFService: BFFService;
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, RouterModule, HttpClientTestingModule],
            declarations: [LoginComponent],
            providers: [BFFProvider],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        // Get the injected instancs of each dependency
        mockRouter = TestBed.inject(Router);
        mockBFFService = TestBed.inject(BFFService);

        mockRouter.navigateByUrl = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should create the Login Component Page', () => {
        expect(component).toBeTruthy();
    });

    describe('Component Initialization', () => {
        it('Builds the login validation form group', () => {
            component.ngOnInit();

            const formGroup = component.loginFormGroup;
            const usernameControl = formGroup.controls['username'];
            const passwordControl = formGroup.controls['password'];

            expect(usernameControl).toBeDefined();
            expect(usernameControl.value).toBe('');

            expect(passwordControl).toBeDefined();
            expect(passwordControl.value).toBe('');
        });
    });

    describe('Login', () => {
        it('Logs in successfully with valid credentials', () => {
            component.ngOnInit();

            const formGroup = component.loginFormGroup;
            const usernameControl = formGroup.controls['username'];
            const passwordControl = formGroup.controls['password'];

            expect(usernameControl).toBeDefined();
            expect(usernameControl.value).toBe('');

            expect(passwordControl).toBeDefined();
            expect(passwordControl.value).toBe('');

            usernameControl.setValue('username');
            passwordControl.setValue('password');

            mockBFFService.login = jest.fn().mockReturnValue(
                of(<LoginResponse>{
                    clientId: 'id',
                    auth: {
                        token: 'token',
                        expiresIn: 3600,
                    },
                }),
            );

            expect(component.isLoading).toBeFalsy();

            component.login();

            expect(component.error.show).toBeFalsy();
            expect(component.isLoading).toBeFalsy();

            expect(mockBFFService.login).toBeCalledTimes(1);
            expect(mockBFFService.login).toBeCalledWith('username', 'password');

            expect(mockRouter.navigateByUrl).toBeCalledTimes(1);
            expect(mockRouter.navigateByUrl).toBeCalledWith(UIUrlsEnum.Dashboard);
        });

        it('Displays invalid credentials message when the credentials are invalid', () => {
            component.ngOnInit();

            const formGroup = component.loginFormGroup;
            formGroup.removeControl('username');
            formGroup.removeControl('password');

            const usernameControl = formGroup.controls['username'];
            const passwordControl = formGroup.controls['password'];

            expect(usernameControl).toBeUndefined();
            expect(passwordControl).toBeUndefined();

            mockBFFService.login = jest
                .fn()
                .mockReturnValue(
                    new Observable((observer) =>
                        observer.error(
                            new HttpErrorResponse({ status: HttpStatusCode.Unauthorized, statusText: 'Unauthorized' }),
                        ),
                    ),
                );

            expect(component.isLoading).toBeFalsy();

            component.login();

            expect(component.error.show).toBeTruthy();
            expect(component.error.message).toBe(LoginErrorsEnum.InvalidCredentials);
            expect(component.isLoading).toBeFalsy();

            expect(mockBFFService.login).toBeCalledTimes(1);
            expect(mockBFFService.login).toBeCalledWith('', '');

            expect(mockRouter.navigateByUrl).toBeCalledTimes(0);
        });

        it('Displays unexpected error message when the API is unavailable', () => {
            component.ngOnInit();

            const formGroup = component.loginFormGroup;
            const usernameControl = formGroup.controls['username'];
            const passwordControl = formGroup.controls['password'];

            expect(usernameControl).toBeDefined();
            expect(usernameControl.value).toBe('');

            expect(passwordControl).toBeDefined();
            expect(passwordControl.value).toBe('');

            usernameControl.setValue('username');
            passwordControl.setValue('password');

            mockBFFService.login = jest.fn().mockReturnValue(
                new Observable((observer) =>
                    observer.error(
                        new HttpErrorResponse({
                            status: HttpStatusCode.ServiceUnavailable,
                            statusText: 'Serivce Unavailable',
                        }),
                    ),
                ),
            );

            expect(component.isLoading).toBeFalsy();

            component.login();

            expect(component.error.show).toBeTruthy();
            expect(component.error.message).toBe(LoginErrorsEnum.UnexpectedError);
            expect(component.isLoading).toBeFalsy();

            expect(mockBFFService.login).toBeCalledTimes(1);
            expect(mockBFFService.login).toBeCalledWith('username', 'password');

            expect(mockRouter.navigateByUrl).toBeCalledTimes(0);
        });
    });
});
