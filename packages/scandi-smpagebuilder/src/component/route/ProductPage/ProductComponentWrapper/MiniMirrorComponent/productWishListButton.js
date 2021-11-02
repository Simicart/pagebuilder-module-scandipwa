import OriginalProductWishlistButton
    from '@scandipwa/scandipwa/src/component/ProductWishlistButton/ProductWishlistButton.container';
import React from 'react';

import { getProductOptionsData } from '../../productSurplus/getProductOptions';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductWishListButton/ProductWishListButton */
export const ProductWishListButton = (props) => {
    const {
        product,
        quantity,
        configurableVariantIndex,
        onProductValidationError,
        groupedProductQuantity,
        isWishlistEnabled
    } = props;

    const productOptionsData = getProductOptionsData(props);

    if (!isWishlistEnabled) {
        return null;
    }

    return (
        <OriginalProductWishlistButton
          product={ product }
          quantity={ quantity }
          configurableVariantIndex={ configurableVariantIndex }
          onProductValidationError={ onProductValidationError }
          productOptionsData={ productOptionsData }
          groupedProductQuantity={ groupedProductQuantity }
        />
    );
};
