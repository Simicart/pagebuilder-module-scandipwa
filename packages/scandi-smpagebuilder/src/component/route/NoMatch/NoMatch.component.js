import Loader from '@scandipwa/scandipwa/src/component/Loader';
import React, {Fragment, useEffect, useLayoutEffect} from 'react';
import {usePbFinder} from 'tapita-pagebuilder-react';

import {useLocation} from '../../Pagebuilder/hook/useLocation';
import {endPoint} from '../../Pagebuilder/Pagebuilder.config';
import OriginalNoMatch from './OriginalNoMatch/OriginalNoMatch';
import {PagebuilderNoMatchWrapperComponent} from './PagebuilderWrapper/PagebuilderNoMatchWrapper.component';

import '../../Pagebuilder/baseStyle.scss';
import getStore from "@scandipwa/scandipwa/src/util/Store";
import {useSimplifiedPageFinding} from "../../Pagebuilder/hook/useSimplifiedPageFinding";

export function NoMatch(props) {
    const {
        updateBreadcrumbs = () => {
        },
        cleanUpTransition = () => {
        },
        changeHeaderState
    } = props || {};

    const state = getStore().getState();
    const {
        code: currentStoreCode
    } = state.ConfigReducer;
    const currentPath = useLocation();

    const {
        loading,
        pageMaskedId,
        pageData,
        notFound,
        found
    } = useSimplifiedPageFinding({
        currentStoreCode,
        path: currentPath
    })

    useLayoutEffect(() => {
        changeHeaderState({
            name: 'found',
            isHiddenOnMobile: false
        });
    }, []);

    return (
        <OriginalNoMatch
            currentStoreCode={currentStoreCode}
            {...props}
        />
    )

    if (found) {
        return (
            <PagebuilderNoMatchWrapperComponent
                pageMaskedId={pageMaskedId}
                pageData={pageData}
                endPoint={endPoint}
                updateBreadcrumbs={updateBreadcrumbs}
                cleanUpTransition={cleanUpTransition}
            />
        );
    }

    if (loading) {
        return (
            <div block="LoaderContainer">
                <Loader isLoading/>
            </div>
        );
    }

    if (notFound) {
        return (
            <OriginalNoMatch
                currentStoreCode={currentStoreCode}
                {...props}
            />
        );
    }

    return null;
}

export default NoMatch;
