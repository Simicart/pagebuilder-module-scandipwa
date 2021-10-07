import { useEffect, useState } from 'react';

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseLocation/useLocation */
export const useLocation = (props) => {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        if (pathname !== location.pathname) {
            setPathname(location.pathname);
        }
    }, [location.pathname]);

    return location.pathname;
};
