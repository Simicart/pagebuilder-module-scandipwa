// get last path name
export const extractBaseUrlForTapitaQuery = (url) => {
    if (!url) {
        return '/';
    }
    const normalizedURL = url[0] === '/' ? url.slice(1) : url;

    const splittedComponents = normalizedURL.split('/');

    if (splittedComponents.length >= 1) {
        return `${splittedComponents[splittedComponents.length - 1]}`;
    } else {
        return '/';
    }
};
