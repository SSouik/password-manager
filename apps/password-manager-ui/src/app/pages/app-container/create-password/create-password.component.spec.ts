import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';

describe('CreatePasswordComponent', () => {
    let component: CreatePasswordComponent;
    let fixture: ComponentFixture<CreatePasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreatePasswordComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreatePasswordComponent);
        component = fixture.componentInstance;
    });

    it('Should create the Create Password Component Page', () => {
        expect(component).toBeTruthy();
    });
});
