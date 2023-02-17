import { Routes } from '@angular/router';

import { CreatePasswordComponent } from './create-password/create-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export default <Routes>[
    {
        path: 'app',
        children: [
            {
                path: 'dashboard',
                pathMatch: 'full',
                component: DashboardComponent,
            },
            {
                path: 'create-password',
                pathMatch: 'full',
                component: CreatePasswordComponent,
            },
        ],
    },
];
