import Loader from '@scandipwa/scandipwa/src/component/Loader';
import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import React from 'react';

import { useProducts } from '../../hook/useProducts';

import './ProductList.scss';

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductList/ProductList */
export const ProductList = (props) => {
    const {
        data,
        loading,
        canRender,
        wholeName
    } = useProducts(props);

    if (canRender) {
        return (
            <div className="root product-list">
                <div className="list-title">
                    {wholeName}
                </div>
                <div className="overall-scroll">
                    {data.products.items.map((productItem, indx) => (
                        <ProductCard
                            key={indx.toString()}
                            product={{
                                ...productItem,
                                options: productItem.options || []
                            }}
                            availableVisualOptions={['label']}
                            device={{}}
                            getAttribute={() => ''}
                            isBundleProductOutOfStock={() => false}
                            isConfigurableProductOutOfStock={() => false}
                            isPreview
                            isWishlistEnabled={false}
                            productOrVariant={productItem}
                            thumbnail={productItem.image.url}
                            linkTo={productItem.url}
                            registerSharedElement={() => ''}
                        />
                    ))}

                </div>
            </div>
        );
    }
    if (loading) {
        return <Loader isLoading/>;
    }

    return null;
};

export default ProductList;
