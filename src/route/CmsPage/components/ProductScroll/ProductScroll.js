import React, { useEffect } from 'react';
import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import { useProducts } from 'Route/CmsPage/hook/useProducts';
import { CarefreeHorizontalScroll } from 'Route/CmsPage/components/CarefreeHorizontalScroll/CarefreeHorizontalScroll';
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import './ProductScroll.scss';

export const ProductScroll = (props) => {
    const {
        data,
        loading,
        canRender,
        item
    } = useProducts(props);

    if (canRender) {
        const products = data.products.items.map((productItem, indx) => {
            return <ProductCard key={indx.toString()}
                                product={productItem}
                                availableVisualOptions={['label']}
                                device={{}}
                                getAttribute={() => ''}
                                isBundleProductOutOfStock={() => false}
                                isConfigurableProductOutOfStock={() => false}
                                isPreview={true}
                                isWishlistEnabled={false}
                                productOrVariant={productItem}
                                thumbnail={productItem.image.url}
                                linkTo={productItem.url}
                                registerSharedElement={() => ''}
            />;
        });

        return (
            <CarefreeHorizontalScroll item={item} _class={'product-scroll'}>
                {products}
            </CarefreeHorizontalScroll>
        );
    } else if (loading) {
        return <Loader isLoading={true}/>;
    }
    return '';
};
