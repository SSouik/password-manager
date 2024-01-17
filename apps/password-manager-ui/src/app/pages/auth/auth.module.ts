import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponentsModule } from '@password-manager:ui:components';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [LoginComponent, SignUpComponent],
    imports: [AuthRoutingModule, AppComponentsModule, BrowserModule, HttpClientModule, ReactiveFormsModule],
    exports: [LoginComponent, SignUpComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
