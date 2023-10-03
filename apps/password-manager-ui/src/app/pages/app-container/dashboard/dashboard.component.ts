import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { GetPasswordsResponse, Password, UIUrlsEnum } from '@password-manager:types';
import { BFFService } from '@password-manager:ui:services/bff/bff.service';
import { HeaderLinks } from '@password-manager:ui:types';

import PageConfig from './dashboard.component.config';

@Component({
    selector: 'password-manager-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @ViewChildren(MatExpansionPanel) public expansionPanels!: QueryList<MatExpansionPanel>;

    public page = {
        isLoading: true,
        username: '',
        header: {
            links: [{ label: 'Create Password', href: '/app/create-password' }] as Array<HeaderLinks>,
        },
        banner: {
            show: false,
            title: PageConfig.banner.createPassword.title,
            message: PageConfig.banner.createPassword.message,
            variant: PageConfig.banner.createPassword.variant,
            button: {
                label: PageConfig.banner.createPassword.button.label,
                click: this.getPasswords.bind(this),
            },
        },
        passwordEntries: [] as Array<{ password: Password; formControl: FormGroup }>,
    };

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly bffService: BFFService,
    ) {
        this.page.username = localStorage.getItem('username') ?? '';
    }

    public ngOnInit(): void {
        this.getPasswords();
    }

    public getPasswords(): void {
        const clientId = localStorage.getItem('sessionId') ?? '';

        this.page.isLoading = true;

        this.bffService.getPasswords(clientId).subscribe({
            next: (response: GetPasswordsResponse) => {
                this.page.passwordEntries = response.passwords.map((password) => {
                    return {
                        password: password,
                        formControl: this.formBuilder.group({
                            name: [password.name, [Validators.required]],
                            website: [password.website],
                            login: [password.login, [Validators.required]],
                            password: [password.value, [Validators.required]],
                        }),
                    };
                });

                this.page.banner.show = false;
                this.page.isLoading = false;
            },
            error: (error: HttpErrorResponse) => {
                // 404s are expected
                if (error.status === HttpStatusCode.NotFound) {
                    this.page.banner = {
                        show: true,
                        title: PageConfig.banner.createPassword.title,
                        message: PageConfig.banner.createPassword.message,
                        variant: PageConfig.banner.createPassword.variant,
                        button: {
                            label: PageConfig.banner.createPassword.button.label,
                            click: this.goToCreatePasswordPage.bind(this),
                        },
                    };
                } else {
                    this.page.banner = {
                        show: true,
                        title: PageConfig.banner.error.title,
                        message: PageConfig.banner.error.message,
                        variant: PageConfig.banner.error.variant,
                        button: {
                            label: PageConfig.banner.error.button.label,
                            click: this.getPasswords.bind(this),
                        },
                    };
                }

                this.page.passwordEntries = [];
                this.page.isLoading = false;
            },
        });
    }

    public updatePassword(index: number): void {
        // Needs to be implemented
        this.closePasswordEntryAccordion(index);
    }

    public deletePassword(index: number): void {
        // Needs to be implemented
        this.closePasswordEntryAccordion(index);
    }

    public cancelPasswordEdit(index: number): void {
        const passwordEntry = this.page.passwordEntries[index];

        passwordEntry.formControl = this.formBuilder.group({
            name: [passwordEntry.password.name, [Validators.required]],
            website: [passwordEntry.password.website],
            login: [passwordEntry.password.login, [Validators.required]],
            password: [passwordEntry.password.value, [Validators.required]],
        });

        this.closePasswordEntryAccordion(index);
    }

    public goToCreatePasswordPage(): void {
        this.router.navigateByUrl(UIUrlsEnum.CreatePassword);
    }

    public closeBanner(): void {
        this.page.banner.show = false;
    }

    private closePasswordEntryAccordion(index: number): void {
        this.expansionPanels.get(index)?.close();
    }
}
