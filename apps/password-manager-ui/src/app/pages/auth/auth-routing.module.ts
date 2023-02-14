import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import AuthRoutes from './auth.routes';

@NgModule({
    imports: [RouterModule.forChild(AuthRoutes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
