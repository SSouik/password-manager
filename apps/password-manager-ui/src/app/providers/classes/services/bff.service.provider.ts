import { ClassProvider } from '@angular/core';
import { BFFService } from '@password-manager:ui:services';
import { DependencyInjectionTokenEnum } from '@password-manager:ui:types';

export default <ClassProvider>{
    provide: DependencyInjectionTokenEnum.BFF_SERVICE,
    useClass: BFFService,
};
