import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export default <Routes>[
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
    },
];
