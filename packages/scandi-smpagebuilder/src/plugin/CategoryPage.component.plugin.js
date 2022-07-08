import * as React from 'react';
import {ProductLayout} from "../component/Pagebuilder/components/LayoutTapita/ProductLayout/ProductLayout";
import {CategoryLayout} from "../component/Pagebuilder/components/LayoutTapita/CategoryLayout/CategoryLayout";

export const CategoryPageScarecrow = (args, callback, instance) => {
    const t = callback()

    return (
        <>
            <CategoryLayout instance={instance} layoutFilter={1}/>
            {t}
            <CategoryLayout instance={instance} layoutFilter={2}/>
        </>
    )
}

export default {
    'Route/CategoryPage/Component': {
        'member-function': {
            render: CategoryPageScarecrow
        }
    }
};
