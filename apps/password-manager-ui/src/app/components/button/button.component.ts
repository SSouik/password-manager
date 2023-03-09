import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'password-manager-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input()
    public additionalClasses = '';

    @Input()
    public label = 'Button';

    @Input()
    public color: 'basic' | 'primary' | 'accent' | 'warn' = 'primary';

    @Input()
    public type: 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'miniFab' = 'raised';

    @Output()
    public click = new EventEmitter<void>();

    public onClick(): void {
        this.click.emit();
    }
}
