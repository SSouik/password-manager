import { Route } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Array<Route> = [
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
];
