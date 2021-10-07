import Loader from '@scandipwa/scandipwa/src/component/Loader';
import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import React from 'react';

import { useProducts } from '../../hook/useProducts';
import { CarefreeHorizontalScroll } from '../CarefreeHorizontalScroll/CarefreeHorizontalScroll';

import './ProductScroll.scss';

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductScroll/ProductScroll */
export const ProductScroll = (props) => {
    const {
        data,
        loading,
        canRender,
        item
    } = useProducts(props);

    if (canRender) {
        const products = data.products.items.map((productItem, indx) => (
<ProductCard
  key={ indx.toString() }
  product={ productItem }
  availableVisualOptions={ ['label'] }
  device={ {} }
  getAttribute={ () => '' }
  isBundleProductOutOfStock={ () => false }
  isConfigurableProductOutOfStock={ () => false }
  isPreview
  isWishlistEnabled={ false }
  productOrVariant={ productItem }
  thumbnail={ productItem.image.url }
  linkTo={ productItem.url }
  registerSharedElement={ () => '' }
/>
        ));

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
