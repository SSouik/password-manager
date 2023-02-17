import { Routes } from '@angular/router';

export default <Routes>[
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'app/dashboard',
    },
];
