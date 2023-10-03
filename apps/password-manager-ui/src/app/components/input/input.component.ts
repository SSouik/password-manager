import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'password-manager-input',
    styleUrls: ['input.component.scss'],
    templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
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
    public sensitive = false;

    @Input()
    public errorMessage = '';

    public sensitiveIcon: 'visibility' | 'visibility_off' = 'visibility';

    public ngOnInit() {
        // If the input is configured to contain a password
        // or other sensitive information, switch the type to
        // 'password' to hide the text
        if (this.sensitive) {
            this.type = 'password';
        }
    }

    public togglePasswordVisibility() {
        this.type = this.type === 'text' ? 'password' : 'text';

        if (this.type === 'text') {
            this.sensitiveIcon = 'visibility_off';
        } else {
            this.sensitiveIcon = 'visibility';
        }
    }
}
