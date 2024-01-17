import { Nullable } from '@password-manager:types';

import { PasswordManagerStorage } from '../../PasswordManagerStorage';

export interface IBrowserStorageService {
    setItem<T extends keyof PasswordManagerStorage>(key: T, value: PasswordManagerStorage[T]): void;
    getItem<T extends keyof PasswordManagerStorage>(key: T): Nullable<PasswordManagerStorage[T]>;
    deleteItem<T extends keyof PasswordManagerStorage>(key: T): void;
    clear(): void;
}
