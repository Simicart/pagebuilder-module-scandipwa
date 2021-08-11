import React from 'react';
import { Fragment } from 'react';
import { endPoint, maskedId } from './CmsPage.config';
import { PageBuilderComponent } from 'simi-pagebuilder-react';
import { Category } from 'Route/CmsPage/components/Category/Category';
import ProductList from 'Route/CmsPage/components/ProductList/ProductList';
import ProductGrid from 'Route/CmsPage/components/ProductGrid/ProductGrid';
import { ProductScroll } from 'Route/CmsPage/components/ProductScroll/ProductScroll';
import { CategoryScroll } from 'Route/CmsPage/components/CategoryScroll/CategoryScroll';
import './baseStyle.scss';

export function CmsPageContainer() {

    return (
        <Fragment>
            <PageBuilderComponent
                endPoint={endPoint}
                maskedId={maskedId}
                toPreview={false}
                Category={Category}
                ProductList={ProductList}
                ProductGrid={ProductGrid}
                ProductScroll={ProductScroll}
                CategoryScroll={CategoryScroll}
            />
        </Fragment>
    );
}

export default CmsPageContainer;
