import React, { useEffect } from 'react';
import InstallPrompt from '@scandipwa/scandipwa/src/component/InstallPrompt';
import { PageBuilderComponent } from 'simi-pagebuilder-react';
import { Category } from 'Component/Pagebuilder/components/Category/Category';
import ProductList from 'Component/Pagebuilder/components/ProductList/ProductList';
import ProductGrid from 'Component/Pagebuilder/components/ProductGrid/ProductGrid';
import { ProductScroll } from 'Component/Pagebuilder/components/ProductScroll/ProductScroll';
import { CategoryScroll } from 'Component/Pagebuilder/components/CategoryScroll/CategoryScroll';
import { DEFAULT_STATE_NAME } from '@scandipwa/scandipwa/src/component/NavigationAbstract/NavigationAbstract.config';

export const PagebuilderHomePageWrapperComponent = (props) => {
    const {
        pageMaskedId,
        endPoint,
        pageData,
        changeHeaderState
    } = props;

    const publishedData = pageData && pageData.publish_items ? pageData : false;

    useEffect(() => {
        changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }, []);

    return (
        <div block="HomePage">
            <InstallPrompt/>
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

