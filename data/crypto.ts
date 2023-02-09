import { AlgorithmEnum, Crypto, EncodingEnum } from '../libs/password-manager-crypto/src';

// Secrets should never be commited, but again this is a
// sample application so the encryption secret means nothing
const crypto = Crypto.create()
    .withAlgorithm(AlgorithmEnum.AES256CTR)
    .withSecret('x5VTQ70CmmbYD1PYq4N2ZkZKNZ22reyK')
    .withInitializationVector('fUip9KgaOoEFetm0')
    .withEncoding(EncodingEnum.Base64);

export default crypto;
