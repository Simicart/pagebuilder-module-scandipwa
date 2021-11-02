import TextPlaceholder from '@scandipwa/scandipwa/src/component/TextPlaceholder';
import React from 'react';
import { connect } from 'react-redux';

import { isInStock } from '../../productSurplus/isInStock';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductStock/mapStateToProps */
export const mapStateToProps = (state) => ({
    displayProductStockStatus: state.ConfigReducer.display_product_stock_status,
    isPriceAlertEnabled: state.ConfigReducer.product_alert_allow_price,
    isInStockAlertEnabled: state.ConfigReducer.product_alert_allow_stock,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductStock/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({});

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductStock/MiniStock */
export const MiniStock = (props) => {
    const { displayProductStockStatus, inStock } = props;

    if (!displayProductStockStatus) {
        return null;
    }

    const stockStatusLabel = inStock ? __('In stock') : __('Out of stock');

    return <span block="ProductActions" elem="Stock">{ stockStatusLabel }</span>;
};

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductStock/_ProductStock */
export const _ProductStock = (props) => {
    const {
        product,
        product: { variants },
        configurableVariantIndex = 0,
        displayProductStockStatus
    } = props;

    const areDetailsLoaded = !!product;
    const inStock = isInStock(props);

    const showOnlyIfLoaded = (expression, content, placeholder = content) => {
        if (!areDetailsLoaded) {
            return placeholder;
        }
        if (areDetailsLoaded && !expression) {
            return null;
        }

        return content;
    };

    const productOrVariant = variants && variants[configurableVariantIndex] !== undefined
        ? variants[configurableVariantIndex]
        : product;

    const { sku } = productOrVariant;

    return (
        <section
          block="ProductActions"
          elem="Section"
          mods={ { type: 'sku' } }
          aria-label="Product SKU and availability"
        >
            { showOnlyIfLoaded(
                sku,
                (
                    <>
                            <span block="ProductActions" elem="Sku" itemProp="sku">
                                { __('SKU: %s', sku) }
                            </span>
                        <MiniStock inStock={ inStock } { ...props } />
                    </>
                ),
                <TextPlaceholder />
            ) }
        </section>
    );
};

export const ProductStock = connect(mapStateToProps, mapDispatchToProps)(_ProductStock);
