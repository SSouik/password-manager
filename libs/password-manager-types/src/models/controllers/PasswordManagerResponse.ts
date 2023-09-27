/* eslint-disable @typescript-eslint/no-explicit-any */
import { PasswordManagerResponseMetadata } from './PasswordManagerResponseMetadata';

export type PasswordManagerResponse = {
    statusCode: number;
    metadata: PasswordManagerResponseMetadata;
};
