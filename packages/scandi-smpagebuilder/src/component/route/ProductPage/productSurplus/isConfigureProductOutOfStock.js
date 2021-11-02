import { IN_STOCK } from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.config';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductSurplus/isConfigureProductOutOfStock/isConfigurableProductOutOfStock */
export const isConfigurableProductOutOfStock = (props) => {
    const { product: { variants = [] }, isPreview } = props;

    if (isPreview) {
        return true;
    }

    const variantsInStock = variants.filter((productVariant) => productVariant.stock_status === IN_STOCK);

    return variantsInStock.length === 0;
};
