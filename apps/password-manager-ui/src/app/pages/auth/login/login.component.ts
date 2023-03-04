import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'password-manager-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    public loginFormGroup!: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.loginFormGroup = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        });
    }
}
