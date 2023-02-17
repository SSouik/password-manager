import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetPasswordsResponse, Password } from '@password-manager:types';
import { HeaderLinks } from '@password-manager:ui:types';

@Component({
    selector: 'password-manager-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public headerLinks: Array<HeaderLinks> = [{ label: 'Create Password', href: '/app/create-password' }];

    public message = '';
    public passwords: Array<Password> = [];

    constructor(private readonly httpClient: HttpClient) {}

    public ngOnInit(): void {
        this.httpClient.get<GetPasswordsResponse>('/api/v1/clients/123/passwords').subscribe({
            next: (response: GetPasswordsResponse) => {
                this.passwords = response.passwords;
            },
            // eslint-disable-next-line
            error: (error: HttpErrorResponse) => {
                this.message = `Getting passwords failed with: ${error.status} - ${error.error.message}`;
                this.passwords = [];
            },
        });
    }
}
