import * as React from 'react';
import {ProductLayout} from "../component/Pagebuilder/components/LayoutTapita/ProductLayout/ProductLayout";

export const ProductPageScarecrow = (args, callback, instance) => {
    const t = callback()

    return (
        <>
            <ProductLayout instance={instance} layoutFilter={1}/>
            {t}
            <ProductLayout instance={instance} layoutFilter={2}/>
        </>
    )
}

export default {
    'Route/ProductPage/Component': {
        'member-function': {
            render: ProductPageScarecrow
        }
    }
};
