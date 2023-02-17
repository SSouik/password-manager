import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryComponent } from './password-recovery.component';

describe('PasswordRecoveryComponent', () => {
    let component: PasswordRecoveryComponent;
    let fixture: ComponentFixture<PasswordRecoveryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasswordRecoveryComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(PasswordRecoveryComponent);
        component = fixture.componentInstance;
    });

    it('Should create the Password Recovery Component Page', () => {
        expect(component).toBeTruthy();
    });
});
