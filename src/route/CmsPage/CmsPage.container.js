import React from 'react';
import { PageBuilderComponent } from 'simi-pagebuilder-react';

import { Placeholder } from 'Route/CmsPage/Placeholder';

import { endPoint, maskedId } from './CmsPage.config';
import { Fragment } from 'react';
import CategoryQuery from '@scandipwa/scandipwa/src/query/Category.query';
import { fetchQuery } from '@scandipwa/scandipwa/src/util/Request';
import { Category } from 'Route/CmsPage/Category/Category';
import ProductList from 'Route/CmsPage/ProductList/ProductList';

export function CmsPageContainer() {

    return (
        <Fragment>
            <PageBuilderComponent
                endPoint={endPoint}
                maskedId={maskedId}
                toPreview={false}
                Category={Category}
                ProductList={ProductList}
                ProductGrid={Placeholder}
                ProductScroll={Placeholder}
                CategoryScroll={Placeholder}
            />
            <h1>Hello</h1>
        </Fragment>
    );
}

export default CmsPageContainer;
