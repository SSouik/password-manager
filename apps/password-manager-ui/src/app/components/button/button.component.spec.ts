import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent Tests', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
    });

    it('Should create the Button Component', () => {
        expect(component).toBeTruthy();
    });

    it('Emits an event when the button is clicked', () => {
        const eventEmitterSpy = jest.spyOn(component.click, 'emit');

        component.onClick();

        expect(eventEmitterSpy).toBeCalledTimes(1);
    });
});
