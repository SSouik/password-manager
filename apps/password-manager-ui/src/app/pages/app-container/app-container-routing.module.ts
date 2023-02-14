import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import AppContainerRoutes from './app-container.routes';

@NgModule({
    imports: [RouterModule.forChild(AppContainerRoutes)],
    exports: [RouterModule],
})
export class AppContainerRoutingModule {}
