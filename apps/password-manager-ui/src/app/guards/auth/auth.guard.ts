/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UIUrlsEnum } from '@password-manager:types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private readonly router: Router) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const tokenExpiration = localStorage.getItem('sessionTokenExpiration');

        // If there is not a token expiration in session, then redirect
        // to the login page Or if the current date is greater than the expiration
        // time (Token is expired)
        if (!tokenExpiration || Date.now() > parseInt(tokenExpiration)) {
            this.router.navigateByUrl(UIUrlsEnum.Login);
            return false;
        }

        return true;
    }
}
