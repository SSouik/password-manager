import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponentsModule } from '@password-manager:ui:components/app-components.module';

import { AppContainerRoutingModule } from './app-container-routing.module';

import AppContainerPages from './index';

@NgModule({
    declarations: [...AppContainerPages],
    imports: [AppContainerRoutingModule, AppComponentsModule, BrowserModule, HttpClientModule],
    exports: [...AppContainerPages],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppContainerModule {}
