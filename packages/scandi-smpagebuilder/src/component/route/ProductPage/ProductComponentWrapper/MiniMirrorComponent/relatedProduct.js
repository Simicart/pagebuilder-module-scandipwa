import ProductLinks from '@scandipwa/scandipwa/src/component/ProductLinks/ProductLinks.container';
import { RELATED } from '@scandipwa/scandipwa/src/store/LinkedProducts/LinkedProducts.reducer';
import React from 'react';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/RelatedProduct/RelatedProduct */
export const RelatedProduct = (props) => (
        <ProductLinks
          linkType={ RELATED }
          title={ __('') }
        />
);
