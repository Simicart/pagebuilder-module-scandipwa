import Loader from '@scandipwa/scandipwa/src/component/Loader';
import React, { useEffect } from 'react';
import { usePbFinder } from 'simi-pagebuilder-react';

import { useLocation } from '../../Pagebuilder/hook/useLocation';
import { endPoint, integrationToken } from '../../Pagebuilder/Pagebuilder.config';
import OriginalNoMatch from './OriginalNoMatch/OriginalNoMatch';
import { PagebuilderNoMatchWrapperComponent } from './PagebuilderWrapper/PagebuilderNoMatchWrapper.component';

import '../../Pagebuilder/baseStyle.scss';

export function NoMatch(props) {
    const {
        updateBreadcrumbs = () => {
        },
        cleanUpTransition = () => {
        },
        currentStoreCode = ''
    } = props || {};

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
            <div block="LoaderContainer">
                <Loader isLoading />
            </div>
        );
    }

    if (pageMaskedId
        && pageMaskedId !== 'notfound') {
        return (
            <PagebuilderNoMatchWrapperComponent
              pageMaskedId={ pageMaskedId }
              pageData={ pageData }
              endPoint={ endPoint }
              updateBreadcrumbs={ updateBreadcrumbs }
              cleanUpTransition={ cleanUpTransition }
            />
        );
    }

    if (pageMaskedId === 'notfound') {
        return (
            <OriginalNoMatch
              { ...props }
            />
        );
    }

    return null;
}

export default NoMatch;
