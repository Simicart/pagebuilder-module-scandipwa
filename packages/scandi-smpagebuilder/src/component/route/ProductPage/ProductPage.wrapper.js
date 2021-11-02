import React, { useEffect } from 'react';
import { usePbFinder } from 'simi-pagebuilder-react';

import { endPoint, integrationToken, storeCode } from '../../Pagebuilder/Pagebuilder.config';
import OriginalProductPage from './OriginalProductPage/OriginalProductPage';
import ProductPage from './ProductPage.component';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/Wrapper/ProductPageWrapper */
export const ProductPageWrapper = (props) => {
    const { containerProps, containerFunctions, instance } = props;
    const { productSKU, product } = containerProps;
    const { categories } = product;

    const pbFinderProps = usePbFinder({
        endPoint,
        integrationToken,
        storeCode
    });

    const {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pathToFind,
        pageData,
        allPages
    } = pbFinderProps;

    useEffect(() => {
        findPage();
    }, []);

    if (pbLoading) {
        return null;
    }
    const productPages = allPages ? allPages.data.catalog_builder_page.items : [];

    const applyMap = productPages
        .sort((a, b) => a.priority - b.priority)
        .map(
            (x) => ({
                ...x,
                apply_to: (x.apply_to || '').split(',')
                    .map((x) => x.trim())
                    .filter((x) => !!x)
            })
        );

    const chosenPage = applyMap.find((page) => {
        if (page.apply_to.length === 0) {
            // case all
            return true;
        } if (page.apply_to.length >= 2) {
            const target = page.apply_to[0];
            const valueToMatch = page.apply_to.slice(1);

            switch (target) {
            case 'product_sku': {
                return valueToMatch.includes(productSKU);
            }
            case 'category_id': {
                const productCategories = (categories || []).map((x) => x.id.toString());
                return valueToMatch.some((x) => productCategories.includes(x));
            }
            case 'product_type': {
                return false;
            }
            default:
                return false;
            }
        } else {
            return false;
        }
    });

    if (chosenPage) {
        return (
            <ProductPage { ...props } chosenPage={ chosenPage } />
        );
    }

    // return null
    return (
        <OriginalProductPage { ...containerFunctions } { ...instance.containerProps() } />
    );
};
