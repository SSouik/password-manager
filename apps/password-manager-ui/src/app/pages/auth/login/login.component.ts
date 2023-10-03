import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UIUrlsEnum } from '@password-manager:types';
import { BFFService } from '@password-manager:ui:services/bff/bff.service';

import PageConfig from './login.component.config';

@Component({
    selector: 'password-manager-login',
    styleUrls: ['login.component.scss'],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    public loginFormGroup!: FormGroup;

    public page = {
        isLoading: false,
        error: {
            show: false,
            message: PageConfig.error.invalidCredentials,
        },
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
        this.page.isLoading = true;
        const username = this.loginFormGroup.get('username')?.value ?? '';
        const password = this.loginFormGroup.get('password')?.value ?? '';

        this.bffService.login(username, password).subscribe({
            next: () => {
                // Login was successful so go to the dashboard page
                this.page.error.show = false;
                this.router.navigateByUrl(UIUrlsEnum.Dashboard);
                this.page.isLoading = false;
            },
            error: (error: HttpErrorResponse) => {
                // If we receive a 401, let the client know
                // that their username and password combo is
                // wrong.
                if (error.status === HttpStatusCode.Unauthorized) {
                    this.page.error.message = PageConfig.error.invalidCredentials;
                } else {
                    this.page.error.message = PageConfig.error.generic;
                }

                this.page.error.show = true;
                this.page.isLoading = false;
            },
        });
    }
}
