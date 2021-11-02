import { IN_STOCK } from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.config';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductSurplus/isBundleProductOutOfStock/isBundleProductOutOfStock */
export const isBundleProductOutOfStock = (props) => {
    const { product: { items = [] } } = props;

    if (items.length === 0) {
        return true;
    }

    const { options } = items[0];

    const optionsInStock = options.filter((option) => option?.product?.stock_status === IN_STOCK);

    return optionsInStock.length === 0;
};
