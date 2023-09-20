import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UIUrlsEnum } from '@password-manager:types';

import { AuthGuard } from './auth.guard';

describe('AuthGuard Tests', () => {
    const mockRouter = Router.prototype;
    let guard: AuthGuard;

    beforeEach(() => {
        mockRouter.navigateByUrl = jest.fn();

        guard = new AuthGuard(mockRouter);
    });

    afterEach(() => {
        localStorage.clear();
        jest.resetAllMocks();
    });

    describe('Can Activate', () => {
        it('Returns false and redirects when the token expiration is not in session', () => {
            const actual = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as boolean;

            expect(mockRouter.navigateByUrl).toBeCalledTimes(1);
            expect(mockRouter.navigateByUrl).toBeCalledWith(UIUrlsEnum.Login);

            expect(actual).toBeFalsy();
        });

        it('Returns false and redirects when the token is expired', () => {
            localStorage.setItem('sesstionTokenExpiration', '1');

            Date.now = jest.fn().mockReturnValue(2);

            const actual = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as boolean;

            expect(mockRouter.navigateByUrl).toBeCalledTimes(1);
            expect(mockRouter.navigateByUrl).toBeCalledWith(UIUrlsEnum.Login);

            expect(actual).toBeFalsy();
        });
    });
});
