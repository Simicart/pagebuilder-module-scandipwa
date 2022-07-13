import InstallPrompt from '@scandipwa/scandipwa/src/component/InstallPrompt';
import {DEFAULT_STATE_NAME} from '@scandipwa/scandipwa/src/component/NavigationAbstract/NavigationAbstract.config';
import React, {useEffect} from 'react';
import {PageBuilderComponent} from 'tapita-pagebuilder-react';

import {Category} from '../../../Pagebuilder/components/Category/Category';
import {CategoryScroll} from '../../../Pagebuilder/components/CategoryScroll/CategoryScroll';
import ProductGrid from '../../../Pagebuilder/components/ProductGrid/ProductGrid';
import ProductList from '../../../Pagebuilder/components/ProductList/ProductList';
import {ProductScroll} from '../../../Pagebuilder/components/ProductScroll/ProductScroll';
import getStore from "@scandipwa/scandipwa/src/util/Store";

/** @namespace ScandiSmpagebuilder/Component/Route/HomePage/PagebuilderWrapper/PagebuilderHomePageWrapper/Component/PagebuilderHomePageWrapperComponent */
export const PagebuilderHomePageWrapperComponent = (props) => {
    const {
        pageMaskedId,
        endPoint,
        pageData,
        changeHeaderState,
        updateBreadcrumbs,
        toggleBreadcrumbs,
        device
    } = props;

    const publishedData = pageData && pageData.publish_items ? pageData : false;

    useEffect(() => {
        const breadcrumbs = [
            {
                url: '/',
                name: __('Home')
            }
        ];
        // !!updateBreadcrumbs && updateBreadcrumbs(breadcrumbs)
        // toggleBreadcrumbs(false)
        !!changeHeaderState && changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }, []);

    return (
        <div block="HomePage">
            <PageBuilderComponent
                key={pageMaskedId}
                pageData={publishedData}
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
