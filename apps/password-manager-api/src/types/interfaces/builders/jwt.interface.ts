import { JWTAlgorithmEnum, Nullable } from '@password-manager:types';

export interface IJWTBuilder<T> {
    withSecret(secret: string): IJWTBuilder<T>;
    withAlgorithm(algorithm: JWTAlgorithmEnum): IJWTBuilder<T>;
    addIssuer(issuer: string): IJWTBuilder<T>;
    addIssuedAt(date: Date): IJWTBuilder<T>;
    addExpiresAt(date: Date): IJWTBuilder<T>;
    addClaim<K extends keyof T>(claim: K, value: T[K]): IJWTBuilder<T>;
    sign(): Promise<string>;
    verify(token: string): Promise<Nullable<T>>;
}
