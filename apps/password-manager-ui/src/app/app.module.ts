import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponentsModule } from '@password-manager:ui:components';
import { AppContainerModule } from '@password-manager:ui:pages:app-container';
import { AuthModule } from '@password-manager:ui:pages:auth';
import Providers from '@password-manager:ui:providers';

import { AppComponent } from './app.component';
import AppRoutes from './app.routes';

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule.forRoot(AppRoutes, { initialNavigation: 'enabledBlocking' }),
        AppComponentsModule,
        AuthModule,
        AppContainerModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: Providers,
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
