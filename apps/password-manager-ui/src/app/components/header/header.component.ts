import { Component, Input } from '@angular/core';
import { HeaderLinks } from '@password-manager:ui:types';

@Component({
    selector: 'password-manager-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() public links: Array<HeaderLinks> = [];
}
