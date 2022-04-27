import Loader from '@scandipwa/scandipwa/src/component/Loader';

import React from 'react';

import { useProducts } from '../../hook/useProducts';
import { CarefreeHorizontalScroll } from '../CarefreeHorizontalScroll/CarefreeHorizontalScroll';

import '../abg.scss';
import { getIndexedProduct } from '@scandipwa/scandipwa/src/util/Product/Product';
import {ProductCardWrapper} from "../ProductCardWrapper/ProductCardWrapper";

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
            const pOp = getIndexedProduct(productItem);

            return (
                <ProductCardWrapper
                    key={indx}
                    normalizedProduct={pOp}
                />
            );
        });

        return (
            <CarefreeHorizontalScroll item={item} _class="product-scroll">
                {products}
            </CarefreeHorizontalScroll>
        );
    }
    if (loading) {
        return <Loader isLoading/>;
    }

    return '';
};
