import { useEffect, useState } from 'react';
import { extractBaseUrlForTapitaQuery } from '../utils/extractBaseUrlForTapitaQuery';

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseLocation/useLocation */
export const useLocation = (props) => {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        if (pathname !== location.pathname) {
            setPathname(extractBaseUrlForTapitaQuery(location.pathname));
        }
    }, [location.pathname]);

    return location.pathname;
};
