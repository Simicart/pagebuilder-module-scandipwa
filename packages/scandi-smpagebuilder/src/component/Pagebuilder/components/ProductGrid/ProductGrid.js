import Loader from '@scandipwa/scandipwa/src/component/Loader';
import React from 'react';

import { useProducts } from '../../hook/useProducts';

import '../abe.scss';
import { getIndexedProduct } from '@scandipwa/scandipwa/src/util/Product/Product';
import {ProductCardWrapper} from "../ProductCardWrapper/ProductCardWrapper";

export const ProductCard = React.lazy(() => import('@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component'));

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductGrid/mapGalleryItem */
export const mapGalleryItem = (item) => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductGrid/ProductGrid */
export const ProductGrid = (props) => {
    const {
        canRender,
        loading,
        data,
        wholeName
    } = useProducts({
        ...props,
        defaultPageSize: 8
    });

    const content = canRender ? data.products.items.map((productItem, indx) => {
        const pOp = getIndexedProduct(productItem);

        return (
            <ProductCardWrapper
                key={indx}
                normalizedProduct={pOp}
            />
        );
    }) : null;

    if (loading) {
        return <Loader isLoading/>;
    }

    return (
        // <div className="product-grid">
        //     <div className="name-container">
        //         <h3 className="name-text">{ wholeName }</h3>
        //     </div>
        //     <div className="start-grid">
        <>
            {content}
        </>
        // </div>
        // </div>
    );
};

export default ProductGrid;
