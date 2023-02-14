import { NgModule } from '@angular/core';

import AppComponents from './index';

@NgModule({
    declarations: [...AppComponents],
    exports: [...AppComponents],
})
export class AppComponentsModule {}
