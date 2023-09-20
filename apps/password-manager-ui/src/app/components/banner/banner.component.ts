import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'password-manager-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
    @Input()
    public title = '';

    @Input()
    public message = '';

    @Input()
    public variant: 'info' | 'warn' | 'error' = 'info';

    @Input()
    public submitButtonLabel = 'Submit';

    @Input()
    public dimissButtonLabel = 'Close';

    @Output()
    public submit = new EventEmitter<void>();

    @Output()
    public dismiss = new EventEmitter<void>();

    public setBackgroundColor(): string {
        switch (this.variant) {
            case 'warn':
                return 'pm--Banner-Background--warn';
            case 'error':
                return 'pm--Banner-Background--error';
            default:
                return 'pm--Banner-Background--info';
        }
    }

    public onSubmit(): void {
        this.submit.emit();
    }

    public onDismiss(): void {
        this.dismiss.emit();
    }
}
