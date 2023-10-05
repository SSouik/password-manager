import { FormControl, FormGroup } from '@angular/forms';

import { InputMatchValidator } from './input-match.validator';

describe('InputMatchValidator Tests', () => {
    describe('Match', () => {
        it('Returns null when the source control value is null', () => {
            const formGroup = new FormGroup({ control2: new FormControl() });
            const actual = InputMatchValidator.match('control1', 'control2')(formGroup);

            expect(actual).toBeNull();
        });

        it('Returns null when the target control value is null', () => {
            const formGroup = new FormGroup({ control1: new FormControl() });
            const actual = InputMatchValidator.match('control1', 'control2')(formGroup);

            expect(actual).toBeNull();
        });

        it('Returns mismatch error when the target control value does not equal the source control value', () => {
            const formGroup = new FormGroup({ control1: new FormControl('foo'), control2: new FormControl('bar') });
            const actual = InputMatchValidator.match('control1', 'control2')(formGroup);

            expect(actual).toStrictEqual({ mismatch: true });
        });

        it('Returns null when the target control value does match the source control value', () => {
            const formGroup = new FormGroup({ control1: new FormControl('foo'), control2: new FormControl('foo') });
            const actual = InputMatchValidator.match('control1', 'control2')(formGroup);

            expect(actual).toBeNull();
        });
    });
});
