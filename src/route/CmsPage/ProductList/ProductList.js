import React from 'react';
import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import { useProducts } from 'Route/CmsPage/useProducts';
import './ProductList.scss';
import Loader from '@scandipwa/scandipwa/src/component/Loader';

const ProductList = props => {
    const {
        data,
        loading,
        canRender,
        wholeName
    } = useProducts(props);

    if (canRender) {
        return (
            <div className={'root product-list'}>
                <div className={'list-title'}
                >
                    {wholeName}
                </div>
                <div className={'overall-scroll'}
                >
                    {
                        data.products.items.map((productItem, indx) => {
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
                        })}

                </div>
            </div>
        );
    } else if (loading) {
        return <Loader isLoading={true}/>;
    }
    return null;
};

export default ProductList;
