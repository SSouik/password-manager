import { ClassProvider } from '@angular/core';
import { BrowserStorageService } from '@password-manager:ui:services';
import { DependencyInjectionTokenEnum } from '@password-manager:ui:types';

export default <ClassProvider>{
    provide: DependencyInjectionTokenEnum.BROWSER_STORAGE_SERVICE,
    useClass: BrowserStorageService,
};
