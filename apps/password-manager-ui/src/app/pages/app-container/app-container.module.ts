import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponentsModule } from '@password-manager:ui:components';

import { AppContainerRoutingModule } from './app-container-routing.module';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [CreatePasswordComponent, DashboardComponent],
    imports: [AppContainerRoutingModule, AppComponentsModule, BrowserModule, HttpClientModule, ReactiveFormsModule],
    exports: [CreatePasswordComponent, DashboardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppContainerModule {}
