import React, { useEffect } from 'react';
import { PageBuilderComponent } from 'simi-pagebuilder-react';

import { Category } from '../../../Pagebuilder/components/Category/Category';
import { CategoryScroll } from '../../../Pagebuilder/components/CategoryScroll/CategoryScroll';
import ProductGrid from '../../../Pagebuilder/components/ProductGrid/ProductGrid';
import ProductList from '../../../Pagebuilder/components/ProductList/ProductList';
import { ProductScroll } from '../../../Pagebuilder/components/ProductScroll/ProductScroll';

/** @namespace ScandiSmpagebuilder/Component/Route/NoMatch/PagebuilderWrapper/PagebuilderNoMatchWrapper/Component/PagebuilderNoMatchWrapperComponent */
export const PagebuilderNoMatchWrapperComponent = (props) => {
    const {
        updateBreadcrumbs,
        cleanUpTransition,
        pageMaskedId,
        pageData,
        endPoint
    } = props;

    const isValidPage = !!pageData && !!pageData.publish_items;
    const pageName = pageData.name;
    const urlPath = pageData.url_path;
    const dispatchData = isValidPage ? pageData : false;

    const breadcrumbs = [
        {
            url: isValidPage ? urlPath : '',
            name: isValidPage ? __(pageName) : __('Not Found')
        }
    ];

    useEffect(() => {
        updateBreadcrumbs(breadcrumbs);
        cleanUpTransition();
    }, [isValidPage]);

    return (
        <div block="SimiPagebuilder">
            <PageBuilderComponent
              key={ pageMaskedId }
              pageData={ dispatchData }
              endPoint={ endPoint }
              maskedId={ pageMaskedId }
              toPreview={ false }
              Category={ Category }
              ProductList={ ProductList }
              ProductGrid={ ProductGrid }
              ProductScroll={ ProductScroll }
              CategoryScroll={ CategoryScroll }
            />
        </div>
    );
};
