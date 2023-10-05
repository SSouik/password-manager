import { Injectable } from '@angular/core';
import { Nullable } from '@password-manager:types';
import { PasswordManagerStorage } from '@password-manager:ui:types';

@Injectable({
    providedIn: 'root',
})
export class BrowserStorageService {
    public setItem<T extends keyof PasswordManagerStorage>(key: T, value: PasswordManagerStorage[T]): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem<T extends keyof PasswordManagerStorage>(key: T): Nullable<PasswordManagerStorage[T]> {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    public deleteItem<T extends keyof PasswordManagerStorage>(key: T): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}
