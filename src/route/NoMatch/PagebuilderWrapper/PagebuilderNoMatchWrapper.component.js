import React, { useEffect } from 'react';
import ProductGrid from 'Component/Pagebuilder/components/ProductGrid/ProductGrid';
import ProductList from 'Component/Pagebuilder/components/ProductList/ProductList';
import { Category } from 'Component/Pagebuilder/components/Category/Category';
import { CategoryScroll } from 'Component/Pagebuilder/components/CategoryScroll/CategoryScroll';
import { PageBuilderComponent } from 'simi-pagebuilder-react';
import { ProductScroll } from 'Component/Pagebuilder/components/ProductScroll/ProductScroll';

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
                key={pageMaskedId}
                pageData={dispatchData}
                endPoint={endPoint}
                maskedId={pageMaskedId}
                toPreview={false}
                Category={Category}
                ProductList={ProductList}
                ProductGrid={ProductGrid}
                ProductScroll={ProductScroll}
                CategoryScroll={CategoryScroll}
            />
        </div>
    );
};

