import * as React from 'react';

import ProductPage from '../component/route/ProductPage/ProductPage.component';
import { ProductPageWrapper } from '../component/route/ProductPage/ProductPage.wrapper';

export const MutatedProductPage = (args, callback, instance) => (
    <ProductPageWrapper
      containerProps={ instance.props }
      args={ args }
      containerFunctions={ instance.containerFunctions }
      instance={ instance }
      pageState={ instance.state }
    />
);

export default {
    'Route/ProductPage/Container': {
        'member-function': {
            render: MutatedProductPage
        }
    }
};
