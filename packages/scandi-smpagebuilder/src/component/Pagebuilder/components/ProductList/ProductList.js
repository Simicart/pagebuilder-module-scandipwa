import Loader from '@scandipwa/scandipwa/src/component/Loader';
import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import React from 'react';
import { connect } from 'react-redux';

import { HomePageContainer } from '../../../route/HomePage/HomePage.container';
import { useProducts } from '../../hook/useProducts';
import { Placeholder } from '../../utils/Placeholder';

import './ProductList.scss';

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

    console.log('dv', device);

    if (canRender) {
        return (
            <div className="root product-list">
                <div className="list-title">
                    <h3>{ wholeName }</h3>
                </div>

                <div className="overall-scroll">
                    { data.products.items.map((productItem, indx) => {
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
                    }) }

                </div>
            </div>
        );
    }
    if (loading) {
        return <Loader isLoading />;
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
