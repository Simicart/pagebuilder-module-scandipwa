import OriginalProductPrice from '@scandipwa/scandipwa/src/component/ProductPrice';
import TextPlaceholder from '@scandipwa/scandipwa/src/component/TextPlaceholder';
import { getPriceLabel } from '@scandipwa/scandipwa/src/util/Price';
import { BUNDLE, CONFIGURABLE } from '@scandipwa/scandipwa/src/util/Product';
import React from 'react';

import { isBundleProductOutOfStock as _isBundleProductOutOfStock } from '../../productSurplus/isBundleProductOutOfStock';
import { isConfigurableProductOutOfStock as _isConfigurableProductOutOfStock } from '../../productSurplus/isConfigureProductOutOfStock';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductPrice/EmptyPrice */

export const EmptyPrice = () => (
            <div
              block="ProductCard"
              elem="PriceWrapper"
              mods={ { isEmpty: true } }
            />
);

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductPrice/ProductPrice */
export const ProductPrice = (props) => {
    const {
        product,
        isConfigurableProductOutOfStock = _isConfigurableProductOutOfStock,
        isBundleProductOutOfStock = _isBundleProductOutOfStock,
        siblingsHavePriceBadge = false,
        setSiblingsHavePriceBadge = () => null
    } = props;

    if (!product) {
        return <TextPlaceholder />;
    }

    const { price_range, price_tiers = [], type_id } = product;

    switch (type_id) {
    case CONFIGURABLE:
        if (isConfigurableProductOutOfStock(props)) {
            return <EmptyPrice />;
        }
        break;
    case BUNDLE:
        if (isBundleProductOutOfStock(props)) {
            return <EmptyPrice />;
        }
        break;
    default:
        break;
    }

    const renderProductTypePriceBadge = () => {
        const label = getPriceLabel(type_id, price_tiers);
        if (label && !siblingsHavePriceBadge) {
            setSiblingsHavePriceBadge();
        }

        return label;
    };

    return (
        <div block="ProductCard" elem="PriceWrapper">
            <OriginalProductPrice
              price={ price_range }
              price_tiers={ price_tiers }
              mix={ { block: 'ProductCard', elem: 'Price' } }
              label={ renderProductTypePriceBadge() }
            />
        </div>
    );
};
