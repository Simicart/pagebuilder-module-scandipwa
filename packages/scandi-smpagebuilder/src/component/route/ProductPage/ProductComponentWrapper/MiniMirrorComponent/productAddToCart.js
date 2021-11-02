import AddToCart from '@scandipwa/scandipwa/src/component/AddToCart/AddToCart.container';
import React from 'react';

import { isInStock } from '../../productSurplus/isInStock';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductAddToCart/ProductAddToCart */
export const ProductAddToCart = (props) => {
    const {
        configurableVariantIndex=0,
        product,
        quantity,
        groupedProductQuantity,
        onProductValidationError,
        productOptionsData
    } = props;
    const inStock = isInStock(props);

    return (
        <AddToCart
          product={ product }
          configurableVariantIndex={ configurableVariantIndex }
          mix={ { block: 'ProductActions', elem: 'AddToCart' } }
          quantity={ quantity }
          groupedProductQuantity={ groupedProductQuantity }
          onProductValidationError={ onProductValidationError }
          productOptionsData={ productOptionsData }
          disabled={ !inStock }
          isWithIcon
        />
    );
};
