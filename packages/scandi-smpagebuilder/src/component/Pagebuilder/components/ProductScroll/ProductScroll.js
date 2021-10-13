import Loader from '@scandipwa/scandipwa/src/component/Loader';
const ProductCard = React.lazy(() => import('@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component'));
import React from 'react';

import { useProducts } from '../../hook/useProducts';
import { CarefreeHorizontalScroll } from '../CarefreeHorizontalScroll/CarefreeHorizontalScroll';

import '../abg.scss';

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductScroll/ProductScroll */
export const ProductScroll = (props) => {
    const {
        device // from app state,
    } = props || {};

    const {
        data,
        loading,
        canRender,
        item
    } = useProducts(props);

    if (canRender) {
        const products = data.products.items.map((productItem, indx) => {
            const pOp = (productItem?.configurable_options || []).map((x) => ({
                ...x,
                attribute_code: x.attribute_code,
                attribute_values: x.values
            }));

            return (
                <ProductCard
                  key={ indx.toString() }
                  product={ {
                      ...productItem,
                      options: productItem?.options || [],
                      configurable_options: pOp,
                      variants: (productItem.variants || []).map((x) => x.product)
                  } }
                  availableVisualOptions={ ['label'] }
                  device={ device || {} }
                  getAttribute={ () => null }
                  isBundleProductOutOfStock={ () => false }
                  isConfigurableProductOutOfStock={ () => false }
                  isPreview
                  isWishlistEnabled={ false }
                  productOrVariant={ productItem }
                  thumbnail={ productItem.image.url }
                  linkTo={ productItem.url }
                  registerSharedElement={ () => '' }
                  inStock
                  parameters={ {} }
                  showSelectOptionsNotification={ () => false }
                  updateConfigurableVariant={ () => null }
                />
            );
        });

        return (
            <CarefreeHorizontalScroll item={ item } _class="product-scroll">
                { products }
            </CarefreeHorizontalScroll>
        );
    } if (loading) {
        return <Loader isLoading />;
    }

    return '';
};
