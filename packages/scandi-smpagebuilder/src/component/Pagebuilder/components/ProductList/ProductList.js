import Loader from '@scandipwa/scandipwa/src/component/Loader';

import React from 'react';
import { useProducts } from '../../hook/useProducts';

import '../abf.scss';
import { getIndexedProduct } from '@scandipwa/scandipwa/src/util/Product/Product';
import {ProductCardWrapper} from "../ProductCardWrapper/ProductCardWrapper";

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductList/ProductList */
export const ProductList = (props) => {
    const {
        device // from app state,
    } = props || {};

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
                    <h3>{wholeName}</h3>
                </div>

                <div className="overall-scroll">
                    {data.products.items.map((productItem, indx) => {
                        const pOp = getIndexedProduct(productItem);

                        return (
                            <ProductCardWrapper
                                key={indx}
                                normalizedProduct={pOp}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
    if (loading) {
        return <Loader isLoading/>;
    }

    return null;
};

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductList/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductList/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({});

export default ProductList;
