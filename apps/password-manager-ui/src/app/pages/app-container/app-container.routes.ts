import { Routes } from '@angular/router';
import { AuthGuard } from '@password-manager:ui:guards';

import { CreatePasswordComponent } from './create-password/create-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export default <Routes>[
    {
        path: 'app',
        children: [
            {
                path: 'dashboard',
                pathMatch: 'full',
                canActivate: [AuthGuard],
                component: DashboardComponent,
            },
            {
                path: 'create-password',
                pathMatch: 'full',
                canActivate: [AuthGuard],
                component: CreatePasswordComponent,
            },
        ],
    },
];
