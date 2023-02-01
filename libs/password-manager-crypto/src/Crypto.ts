import * as crypto from 'crypto';

import { AlgorithmEnum, EncodingEnum } from './types';

export class Crypto {
    private algorithm: AlgorithmEnum;
    private secret: string;
    private encoding: EncodingEnum;
    private initializationVector: Buffer;
    private authTag: Buffer;

    constructor() {
        this.algorithm = AlgorithmEnum.AES128CCM;
        this.secret = '';
        this.encoding = EncodingEnum.Hex;
        this.initializationVector = crypto.randomBytes(12);
        this.authTag = Buffer.from('');
    }

    public static create(): Crypto {
        return new Crypto();
    }

    public withAlgorithm(algorithm: AlgorithmEnum): Crypto {
        this.algorithm = algorithm;
        return this;
    }

    public withSecret(secret: string): Crypto {
        this.secret = secret;
        return this;
    }

    public withEncoding(encoding: EncodingEnum): Crypto {
        this.encoding = encoding;
        return this;
    }

    public encrypt(value: string): string {
        const cipher = crypto.createCipheriv(
            this.algorithm as crypto.CipherCCMTypes,
            Buffer.from(this.secret),
            this.initializationVector,
            { authTagLength: 16 },
        );

        const encryptedValue = Buffer.concat([cipher.update(value), cipher.final()]);

        this.authTag = cipher.getAuthTag();

        return encryptedValue.toString(this.encoding);
    }

    public decrypt(value: string): string {
        const decipher = crypto.createDecipheriv(
            this.algorithm as crypto.CipherCCMTypes,
            Buffer.from(this.secret),
            this.initializationVector,
            { authTagLength: 16 },
        );

        decipher.setAuthTag(this.authTag);

        const decryptedValue = Buffer.concat([decipher.update(Buffer.from(value, this.encoding)), decipher.final()]);

        return decryptedValue.toString();
    }
}
