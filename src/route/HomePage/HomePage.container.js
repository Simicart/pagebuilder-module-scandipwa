import React, { useEffect } from 'react';
import { endPoint, integrationToken, storeCode } from 'Component/Pagebuilder/Pagebuilder.config';
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import OriginalHomePage from './OriginalHomePage/OriginalHomePage';
import { usePbFinder } from 'simi-pagebuilder-react';
import { useLocation } from 'Component/Pagebuilder/hook/useLocation';
import { PagebuilderHomePageWrapperComponent } from 'Route/HomePage/PagebuilderWrapper/PagebuilderHomePageWrapper.component';
import 'Component/Pagebuilder/baseStyle.scss';

export function HomePageContainer(props) {
    const { changeHeaderState } = props;

    const {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pageData
    } = usePbFinder({
        endPoint,
        integrationToken,
        storeCode,
        getPageItems: true
    });

    const currentPath = useLocation();

    useEffect(() => {
        if (!pageMaskedId) {
            findPage('/');
        }
    }, [currentPath, pageMaskedId, findPage]);

    if (pbLoading) {
        return (
            <div block={'LoaderContainer'}>
                <Loader isLoading={true}/>
            </div>
        );
    } else if (pageMaskedId &&
        pageMaskedId !== 'notfound') {
        return (
            <PagebuilderHomePageWrapperComponent
                changeHeaderState={changeHeaderState}
                pageMaskedId={pageMaskedId}
                pageData={pageData}
                endPoint={endPoint}/>
        );
    } else if (pageMaskedId === 'notfound') {
        return <OriginalHomePage {...props}/>;
    }
    return null;
}

export default HomePageContainer;
