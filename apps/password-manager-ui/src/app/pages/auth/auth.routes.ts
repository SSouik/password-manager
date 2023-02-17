import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export default <Routes>[
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
    },
    {
        path: 'sign-up',
        pathMatch: 'full',
        component: SignUpComponent,
    },
];
