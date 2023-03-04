import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent Tests', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [LoginComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
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
});
