import React, { useState, useEffect } from 'react';

export const useLocation = (props) => {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        if (pathname !== location.pathname) {
            setPathname(location.pathname);
        }
    }, [location.pathname]);

    return location.pathname;
};
