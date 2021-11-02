/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductSurplus/GetProductOptions/getProductOptionsData */
export const getProductOptionsData = (props) => {
    const { product: { options } } = props;

    if (!options) {
        return { requiredOptions: [] };
    }

    return {
        requiredOptions: options
            .map(({ option_id, required }) => (required ? option_id : null))
            .filter((item) => !!item)
    };
};
