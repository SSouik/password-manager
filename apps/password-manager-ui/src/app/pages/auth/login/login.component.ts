import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UIUrlsEnum } from '@password-manager:types';
import { BFFService } from '@password-manager:ui:services/bff/bff.service';

import { LoginErrorsEnum } from './LoginErrorsEnum';

@Component({
    selector: 'password-manager-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    public loginFormGroup!: FormGroup;

    public isLoading = false;
    public error = {
        show: false,
        message: LoginErrorsEnum.InvalidCredentials,
    };

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly bffService: BFFService,
    ) {}

    public ngOnInit(): void {
        this.loginFormGroup = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        });
    }

    public login(): void {
        const username = this.loginFormGroup.get('username')?.value ?? '';
        const password = this.loginFormGroup.get('password')?.value ?? '';

        this.bffService.login(username, password).subscribe({
            next: () => {
                this.error.show = false;
                this.router.navigateByUrl(UIUrlsEnum.Dashboard);
            },
            error: (error: HttpErrorResponse) => {
                // If we receive a 401, let the client know
                // that their username and password combo is
                // wrong.
                if (error.status === HttpStatusCode.Unauthorized) {
                    this.error.message = LoginErrorsEnum.InvalidCredentials;
                } else {
                    this.error.message = LoginErrorsEnum.UnexpectedError;
                }

                this.error.show = true;
            },
            complete: () => {
                this.isLoading = false;
            },
        });
    }
}
