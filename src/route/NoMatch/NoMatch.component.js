import React, { useEffect } from 'react';
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import OriginalNoMatch from 'Route/NoMatch/OriginalNoMatch/OriginalNoMatch';
import { endPoint, integrationToken } from 'Component/Pagebuilder/Pagebuilder.config';
import { PagebuilderNoMatchWrapperComponent } from 'Route/NoMatch/PagebuilderWrapper/PagebuilderNoMatchWrapper.component';
import { useLocation } from 'Component/Pagebuilder/hook/useLocation';
import { usePbFinder } from 'simi-pagebuilder-react';
import 'Component/Pagebuilder/baseStyle.scss';

export function NoMatch(props) {
    const {
        updateBreadcrumbs,
        cleanUpTransition,
        currentStoreCode = ''
    } = props;

    const {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pageData,
        pathToFind
    } = usePbFinder({
        endPoint,
        integrationToken,
        storeCode: currentStoreCode,
        getPageItems: true
    });

    const currentPath = useLocation();

    useEffect(() => {
        if (!pageMaskedId || currentPath !== pathToFind) {
            findPage(currentPath);
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
            <PagebuilderNoMatchWrapperComponent
                pageMaskedId={pageMaskedId}
                pageData={pageData}
                endPoint={endPoint}
                updateBreadcrumbs={updateBreadcrumbs}
                cleanUpTransition={cleanUpTransition}
            />
        );
    } else if (pageMaskedId === 'notfound') {
        return <OriginalNoMatch {...props}/>;
    }
    return null;
}

export default NoMatch;
