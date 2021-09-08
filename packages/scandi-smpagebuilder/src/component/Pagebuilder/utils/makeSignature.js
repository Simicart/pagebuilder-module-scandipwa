/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Utils/MakeSignature/makeSignature */
export const makeSignature = (o, type = '') => JSON.stringify(o) + type;
