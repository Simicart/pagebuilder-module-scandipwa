/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductSurplus/GetMinQuantity/getMinQuantity */
export const getMinQuantity = (props) => {
    const {
        product: { stock_item: { min_sale_qty } = {}, variants } = {},
        configurableVariantIndex
    } = props;

    if (!min_sale_qty) {
        return 1;
    }
    if ((!configurableVariantIndex && !variants) || configurableVariantIndex === -1) {
        return min_sale_qty;
    }

    const { stock_item: { min_sale_qty: minVariantQty } = {} } = variants[configurableVariantIndex] || {};

    return minVariantQty || min_sale_qty;
};
