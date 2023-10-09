import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { GetPasswordsResponse, Password, UIUrlsEnum } from '@password-manager:types';
import { BFFService } from '@password-manager:ui:services/bff/bff.service';
import { BrowserStorageService } from '@password-manager:ui:services/browser-storage/browser-storage.service';
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
        private readonly browserStorageService: BrowserStorageService,
    ) {
        this.page.username = this.browserStorageService.getItem('username') ?? '';
    }

    public ngOnInit(): void {
        // Once the component loads in the browser, get the
        // client's passwords
        this.getPasswords();
    }

    public getPasswords(): void {
        // Get the client's ID from local storage. Should exist
        // after the client has successfully logged in
        const clientId = this.browserStorageService.getItem('sessionId') ?? '';

        this.page.isLoading = true;

        this.bffService.getPasswords(clientId).subscribe({
            next: (response: GetPasswordsResponse) => {
                // On a successful request to the BFF to get the client's
                // password. Map the passwords to the password entries object
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
                // 404s are expected. This means the client does
                // not have any passwords yet and they should
                // be prompted to create one
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
                    // Some error other than a 404 happened. This means
                    // that something went wrong so display an error
                    // indicating that
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
        // Similar to the getPasswords method, this should
        // rely on a method in the BFFService that will
        // update a password. Notice the argument for this
        // method is a number label 'index'. This can be used
        // to get the correct form values.
        this.closePasswordEntryAccordion(index);
    }

    public deletePassword(index: number): void {
        // Needs to be implemented
        // Similar to the getPasswords method, this should
        // rely on a method in the BFFService. Notice the
        // argument is a number label 'index'. This can be used
        // to get the desired password ID to delete.
        this.closePasswordEntryAccordion(index);
    }

    public cancelPasswordEdit(index: number): void {
        // Get the desired password entry. This contains the
        // password object/entity along with the form group
        // associated with each.
        const passwordEntry = this.page.passwordEntries[index];

        // Reset the form control for the password to the intial
        // values of the password entity that the BFF returned
        passwordEntry.formControl = this.formBuilder.group({
            name: [passwordEntry.password.name, [Validators.required]],
            website: [passwordEntry.password.website],
            login: [passwordEntry.password.login, [Validators.required]],
            password: [passwordEntry.password.value, [Validators.required]],
        });

        // Close the expansion panel
        this.closePasswordEntryAccordion(index);
    }

    public goToCreatePasswordPage(): void {
        this.router.navigateByUrl(UIUrlsEnum.CreatePassword);
    }

    public closeBanner(): void {
        this.page.banner.show = false;
    }

    private closePasswordEntryAccordion(index: number): void {
        // Closes the currently open/selected expansion panel
        this.expansionPanels.get(index)?.close();
    }
}
