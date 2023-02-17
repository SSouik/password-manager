import { createSecretKey, KeyObject } from 'crypto';

import { IJWTBuilder } from '@password-manager:api:interfaces';
import { DateUtils } from '@password-manager:api:utils';
import { JWTAlgorithmEnum } from '@password-manager:types';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

export class JWTBuilder<T> implements IJWTBuilder<T> {
    private algorithm: JWTAlgorithmEnum;
    private secret: KeyObject;
    private issuer: string;
    private issuedAt: number;
    private expiration: number;
    private claims: T;

    constructor() {
        this.issuer = '';
        this.expiration = 0;
        this.issuedAt = 0;
        this.claims = {} as T;
    }

    public static create<K>(): IJWTBuilder<K> {
        return new JWTBuilder<K>();
    }

    public withSecret(secret: string): IJWTBuilder<T> {
        this.secret = createSecretKey(Buffer.from(secret, 'utf-8'));
        return this;
    }

    public withAlgorithm(algorithm: JWTAlgorithmEnum): IJWTBuilder<T> {
        this.algorithm = algorithm;
        return this;
    }

    public addIssuer(issuer: string): IJWTBuilder<T> {
        this.issuer = issuer;
        return this;
    }

    public addIssuedAt(date: Date): IJWTBuilder<T> {
        this.issuedAt = DateUtils.toEpoch(date);
        return this;
    }

    public addExpiresAt(date: Date): IJWTBuilder<T> {
        this.expiration = DateUtils.toEpoch(date);
        return this;
    }

    public addClaim<K extends keyof T>(claim: K, value: T[K]): IJWTBuilder<T> {
        this.claims[claim] = value;
        return this;
    }

    public sign(): Promise<string> {
        return new SignJWT(<T & JWTPayload>this.claims)
            .setProtectedHeader({ alg: this.algorithm })
            .setIssuer(this.issuer)
            .setIssuedAt(this.issuedAt)
            .setExpirationTime(this.expiration)
            .sign(this.secret);
    }

    public async verify(token: string): Promise<T> {
        const { payload }: { payload: JWTPayload } = await jwtVerify(token, this.secret);
        return <T>payload;
    }
}
