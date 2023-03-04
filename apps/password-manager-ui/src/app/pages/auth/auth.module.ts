import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponentsModule } from '@password-manager:ui:components/app-components.module';

import { AuthRoutingModule } from './auth-routing.module';

import AuthPageComponents from './index';

@NgModule({
    declarations: [...AuthPageComponents],
    imports: [AuthRoutingModule, AppComponentsModule, BrowserModule, HttpClientModule, ReactiveFormsModule],
    exports: [...AuthPageComponents],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
