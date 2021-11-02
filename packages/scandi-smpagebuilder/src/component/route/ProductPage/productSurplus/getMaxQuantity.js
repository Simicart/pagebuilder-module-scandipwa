import { DEFAULT_MAX_PRODUCTS } from '@scandipwa/scandipwa/src/component/ProductActions/ProductActions.config';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductSurplus/GetMaxQuantity/getMaxQuantity */
export const getMaxQuantity = (props) => {
    const {
        product: {
            stock_item: {
                max_sale_qty
            } = {},
            variants
        } = {},
        configurableVariantIndex
    } = props;

    if (!max_sale_qty) {
        return DEFAULT_MAX_PRODUCTS;
    }

    if (configurableVariantIndex === -1 || !Object.keys(variants).length) {
        return max_sale_qty;
    }

    const {
        stock_item: {
            max_sale_qty: maxVariantQty
        } = {}
    } = variants[configurableVariantIndex] || {};

    return maxVariantQty || max_sale_qty;
};
