import React from 'react';

import {HomePageContainer} from '../component/route/HomePage/HomePage.container';

export const HomePageScarecrow = (args, callback, instance) => {
    console.log('talle rerenderign')
    return (
        <HomePageContainer {...instance.props} />
    );
}

export default {
    'Route/HomePage/Container': {
        'member-function': {
            render: HomePageScarecrow
        }
    }
};
