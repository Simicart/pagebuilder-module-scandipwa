import * as React from 'react';

import NoMatch from '../component/route/NoMatch/NoMatch.component';

export const NoMatchScarecrow = (args, callback, instance) => {
    console.log('bbbbb')
    return <NoMatch {...instance.props} />;
};

export default {
    'Route/NoMatch/Container': {
        'member-function': {
            render: NoMatchScarecrow
        }
    }
};
