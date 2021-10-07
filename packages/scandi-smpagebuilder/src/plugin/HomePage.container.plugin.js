import React from 'react';

import { HomePageContainer } from '../component/route/HomePage/HomePage.container';

export const HomePageScarecrow = (args, callback, instance) => (
    <HomePageContainer { ...instance.props } />
);

export default {
    'Route/HomePage/Container': {
        'member-function': {
            render: HomePageScarecrow
        }
    }
};
