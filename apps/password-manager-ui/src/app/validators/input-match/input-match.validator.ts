import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class InputMatchValidator {
    public static match(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceValue = control.value[source];
            const targetValue = control.value[target];

            if (!sourceValue || !targetValue) {
                return null;
            } else if (targetValue !== sourceValue) {
                return { mismatch: true };
            } else {
                return null;
            }
        };
    }
}
