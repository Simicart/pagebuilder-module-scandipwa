export const makeSignature = (o, type = '') => {
    return JSON.stringify(o) + type;
};
