import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export default <Routes>[
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
    },
];
