import { KeyObject } from 'crypto';

import { JWTAlgorithmEnum } from '@password-manager:types';
import * as jose from 'jose';

import { JWTBuilder } from './jwt.builder';

type TestType = {
    foo: string;
    bar: number;
};

describe('JWTBuilder Tests', () => {
    jest.mock('jose', () => ({
        SignJWT: jest.fn().mockReturnThis(),
    }));

    jest.mock('crypto', () => ({
        createSecretKey: jest.fn().mockReturnValue({} as KeyObject),
    }));

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Create', () => {
        it('Creates a new instance of the JWTBuilder', () => {
            expect(JWTBuilder.create()).toBeInstanceOf(JWTBuilder);
        });
    });

    describe('With Secret', () => {
        it('Adds the JWT secret and returns the instance of JWTBuilder', () => {
            const builder = JWTBuilder.create();
            const actual = builder.withSecret('foo');

            expect(actual).toStrictEqual(builder);
            expect(actual).toBeInstanceOf(JWTBuilder);
        });
    });

    describe('With Algorithm', () => {
        it('Adds the JWT algorithm and returns the instance of JWTBuilder', () => {
            const builder = JWTBuilder.create();
            const actual = builder.withAlgorithm(JWTAlgorithmEnum.DIR);

            expect(actual).toStrictEqual(builder);
            expect(actual).toBeInstanceOf(JWTBuilder);
        });
    });

    describe('Add Issuer', () => {
        it('Adds the JWT issuer and returns the instance of JWTBuilder', () => {
            const builder = JWTBuilder.create();
            const actual = builder.addIssuer('https://foo.com');

            expect(actual).toStrictEqual(builder);
            expect(actual).toBeInstanceOf(JWTBuilder);
        });
    });

    describe('Add Issued At', () => {
        it('Adds the JWT issued at and returns the instance of JWTBuilder', () => {
            const builder = JWTBuilder.create();
            const actual = builder.addIssuedAt(new Date());

            expect(actual).toStrictEqual(builder);
            expect(actual).toBeInstanceOf(JWTBuilder);
        });
    });

    describe('Add Expires At', () => {
        it('Adds the JWT expires at and returns the instance of JWTBuilder', () => {
            const builder = JWTBuilder.create();
            const actual = builder.addExpiresAt(new Date());

            expect(actual).toStrictEqual(builder);
            expect(actual).toBeInstanceOf(JWTBuilder);
        });
    });

    describe('Add Claim', () => {
        it('Adds the JWT claim and returns the instance of JWTBuilder', () => {
            const builder = JWTBuilder.create<TestType>();
            const actual = builder.addClaim('foo', 'bar').addClaim('bar', 123);

            expect(actual).toStrictEqual(builder);
            expect(actual).toBeInstanceOf(JWTBuilder);
        });
    });

    describe('Sign', () => {
        it('Creates a token', async () => {
            const signSpy = jest.spyOn(jose.SignJWT.prototype, 'sign').mockResolvedValue('token');

            const actual = await JWTBuilder.create().withAlgorithm(JWTAlgorithmEnum.HS256).withSecret('foo').sign();

            expect(signSpy).toBeCalledTimes(1);

            expect(actual).toBe('token');
        });
    });

    describe('Verify', () => {
        it('Returns the payload claims when the token is valid', async () => {
            const verifySpy = jest.spyOn(jose, 'jwtVerify').mockResolvedValue({
                payload: { foo: 'bar', bar: 123 },
                protectedHeader: {} as jose.CompactJWEHeaderParameters,
                key: {} as jose.KeyLike,
            });

            const builder = JWTBuilder.create<TestType>().withSecret('foo');

            const actual = await builder.verify('token');

            expect(verifySpy).toBeCalledTimes(1);
            expect(verifySpy).toBeCalledWith('token', expect.anything());

            expect(actual).toStrictEqual(<TestType>{ foo: 'bar', bar: 123 });
        });

        it('Fails to verify the token and throws the exception', async () => {
            const verifySpy = jest.spyOn(jose, 'jwtVerify').mockRejectedValue(new Error('invalid'));

            const builder = JWTBuilder.create<TestType>().withSecret('foo');

            try {
                await builder.verify('token');
            } catch (error) {
                expect(verifySpy).toBeCalledTimes(1);
                expect(verifySpy).toBeCalledWith('token', expect.anything());

                expect(error).toBeTruthy();
                expect(error.message).toBe('invalid');
            }
        });
    });
});
