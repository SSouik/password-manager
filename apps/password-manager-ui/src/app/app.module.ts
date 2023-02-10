import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import AppComponents from '@password-manager:ui:components';
import PageComponents from '@password-manager:ui:pages';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

@NgModule({
    declarations: [AppComponent, ...AppComponents, ...PageComponents],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
