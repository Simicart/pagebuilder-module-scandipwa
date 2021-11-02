import NoMatchHandler from '@scandipwa/scandipwa/src/route/NoMatchHandler/NoMatchHandler.component';
import * as React from 'react';
import { useEffect } from 'react';
import { PageBuilderComponent, usePbFinder } from 'simi-pagebuilder-react';

import { Category } from '../../Pagebuilder/components/Category/Category';
import { CategoryScroll } from '../../Pagebuilder/components/CategoryScroll/CategoryScroll';
import ProductGrid from '../../Pagebuilder/components/ProductGrid/ProductGrid';
import ProductList from '../../Pagebuilder/components/ProductList/ProductList';
import { ProductScroll } from '../../Pagebuilder/components/ProductScroll/ProductScroll';
import { endPoint, integrationToken, storeCode } from '../../Pagebuilder/Pagebuilder.config';
import { productDetailTypeMap } from './ProductComponentWrapper/productDetailTypeMap';
import { useQuantity } from './useQuantity';

import './abc.scss';
/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/Component/handleError */
export const handleError = () => null;

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/Component/ProductPage */
export const ProductPage = (props) => {
    const {
        containerProps, containerFunctions, pageState, chosenPage
    } = props || {};

    const { location, product: productDataAutoRequested } = containerProps;
    const { parameters, productOptionsData, configurableVariantIndex } = pageState;

    const { updateConfigurableVariant, getSelectedCustomizableOptions } = containerFunctions;

    const { quantity, setQuantity, groupedProductQuantity } = useQuantity();

    if (!productDataAutoRequested) {
        return null;
    }

    const overRender = (item, itemProps, innerContent) => {
        if (!item || !itemProps || !productDataAutoRequested) {
            return null;
        }
        const { type } = item;

        const ProductSubComponent = productDetailTypeMap[type];

        if (ProductSubComponent) {
            return (
                <ProductSubComponent
                  product={ productDataAutoRequested }
                  quantity={ quantity }
                  setQuantity={ setQuantity }
                  groupedProductQuantity={ groupedProductQuantity }
                  configurableVariantIndex={ configurableVariantIndex }
                  onProductValidationError={ handleError }
                  parameters={ parameters }
                  updateConfigurableVariant={ updateConfigurableVariant }
                  getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                  productOptionsData={ productOptionsData }
                  item={ item }
                />
            );
        }

        return null;
    };

    const pbProps = {
        pageData: chosenPage,
        ProductList,
        ProductGrid,
        ProductScroll,
        CategoryScroll,
        Category,
        endPoint,
        // formatMessage,
        // Link: Link,
        history,
        lazyloadPlaceHolder: <div />,
        overRender
    };

    return (
        <NoMatchHandler location={ location }>
            <main
              block="ProductPage no-auto-overflow"
              aria-label="Product page"
              itemScope
              itemType="http://schema.org/Product"
            >
                <PageBuilderComponent
                  { ...pbProps }
                  overRender={ overRender }
                />
            </main>
        </NoMatchHandler>
    );
};

export default ProductPage;
