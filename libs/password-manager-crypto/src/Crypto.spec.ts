import { Crypto } from './Crypto';
import { AlgorithmEnum, EncodingEnum } from './types';

const value = 'password';

jest.mock('crypto', () => ({
    createCipheriv: () => ({
        update: (val: string) => Buffer.from(val),
        final: () => Buffer.from(''),
        getAuthTag: () => Buffer.from('auth-tag'),
    }),
    createDecipheriv: () => ({
        setAuthTag: jest.fn(),
        update: () => Buffer.from(''),
        final: () => Buffer.from(value),
    }),
    randomBytes: (size: number) => Buffer.alloc(size),
}));

describe('Crypto Tests', () => {
    let crypto: Crypto;

    beforeEach(() => {
        crypto = Crypto.create()
            .withAlgorithm(AlgorithmEnum.AES256GCM)
            .withSecret('x5VTQ70CmmbYD1PYq4N2ZkZKNZ22reyK')
            .withEncoding(EncodingEnum.Base64);
    });

    it('Encrypts and decrypts a string value', () => {
        const encryptedValue = crypto.encrypt(value);
        const decryptedValue = crypto.decrypt(encryptedValue);

        expect(decryptedValue).toBe(value);
    });
});
