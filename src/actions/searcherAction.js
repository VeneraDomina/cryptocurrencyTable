export const FIND_CRYPTO = 'FIND_CRYPTO';

export const findCrypto =  (crypto) => ({
    type:    FIND_CRYPTO,
    payload: crypto
});
