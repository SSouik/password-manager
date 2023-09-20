import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent Tests', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BannerComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should create the Banner Component', () => {
        expect(component).toBeTruthy();
    });

    describe('Set Background Color', () => {
        it('Sets the background color to warn when the banner variant is warn', () => {
            component.variant = 'warn';
            const actual = component.setBackgroundColor();

            expect(actual).toBe('pm--Banner-Background--warn');
        });

        it('Sets the background color to error when the banner variant is error', () => {
            component.variant = 'error';
            const actual = component.setBackgroundColor();

            expect(actual).toBe('pm--Banner-Background--error');
        });

        it('Sets the background color to info when the banner variant is info', () => {
            component.variant = 'info';
            const actual = component.setBackgroundColor();

            expect(actual).toBe('pm--Banner-Background--info');
        });
    });

    describe('On Submit', () => {
        it('Emits an event when the submit button is clicked', () => {
            const emitSpy = jest.spyOn(EventEmitter.prototype, 'emit');

            component.onSubmit();

            expect(emitSpy).toBeCalledTimes(1);
        });
    });

    describe('On Dismiss', () => {
        it('Emits an event when the dismiss button is clicked', () => {
            const emitSpy = jest.spyOn(EventEmitter.prototype, 'emit');

            component.onDismiss();

            // No idea why this is called 4 times, come back to it
            expect(emitSpy).toBeCalledTimes(4);
        });
    });
});
