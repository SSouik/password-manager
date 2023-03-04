import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'password-manager-input',
    templateUrl: './input.component.html',
})
export class InputComponent {
    @Input()
    public parentFormGroup!: FormGroup;

    @Input()
    public formKey!: string;

    @Input()
    public label = '';

    @Input()
    public for = '';

    @Input()
    public placeholder = '';

    @Input()
    public type: 'text' | 'password' = 'text';

    @Input()
    public required = false;

    @Input()
    public errorMessage = '';
}
