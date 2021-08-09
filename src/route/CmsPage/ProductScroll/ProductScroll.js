import { useProducts } from 'Route/CmsPage/useProducts';
import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import React from 'react';
import { CarefreeHorizontalScroll } from 'Route/CmsPage/CarefreeHorizontalScroll/CarefreeHorizontalScroll';
import Loader from '@scandipwa/scandipwa/src/component/Loader';

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
                <CarefreeHorizontalScroll item={item}>
                    {products}
                </CarefreeHorizontalScroll>
            );
        } else if (loading) {
            return <Loader isLoading={true}/>;
        }
        return '';
    }
;
