import { toggleBreadcrumbs } from '@scandipwa/scandipwa/src/store/Breadcrumbs/Breadcrumbs.action';

import Loader from '@scandipwa/scandipwa/src/component/Loader';
import {changeNavigationState} from '@scandipwa/scandipwa/src/store/Navigation/Navigation.action';
import {TOP_NAVIGATION_TYPE} from '@scandipwa/scandipwa/src/store/Navigation/Navigation.reducer';
import PropTypes from 'prop-types';
import React, {PureComponent, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {endPoint, integrationToken} from '../../Pagebuilder/Pagebuilder.config';
import OriginalHomePage from './OriginalHomePage/OriginalHomePage';
import {PagebuilderHomePageWrapperComponent} from './PagebuilderWrapper/PagebuilderHomePageWrapper.component';

import '../../Pagebuilder/baseStyle.scss';
import getStore from "@scandipwa/scandipwa/src/util/Store";
import {useSimplifiedPageFinding} from "../../Pagebuilder/hook/useSimplifiedPageFinding";
import {BreadcrumbsDispatcher} from "@scandipwa/scandipwa/src/route/CartPage/CartPage.container";

export function HomePageContainerCore(props) {
    const {
        changeHeaderState,
        currentStoreCode,
        device,
        updateBreadcrumbs,
        toggleBreadcrumbs
    } = props || {};

    const {
        loading,
        pageMaskedId,
        pageData,
        notFound,
        found,
        _p,
        _c,
        _s,
        cacheKey,
        cacheData
    } = useSimplifiedPageFinding({
        currentStoreCode,
        path: '/'
    })

    if (found) {
        return (
            <PagebuilderHomePageWrapperComponent
                changeHeaderState={changeHeaderState}
                updateBreadcrumbs={updateBreadcrumbs}
                toggleBreadcrumbs={toggleBreadcrumbs}
                pageMaskedId={pageMaskedId}
                pageData={pageData}
                endPoint={endPoint}
                currentStoreCode={currentStoreCode}
                device={device}
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
        return <OriginalHomePage {...props} />;
    }

    return null;
}

/** @namespace ScandiSmpagebuilder/Component/Route/HomePage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page,
    currentStoreCode: state.ConfigReducer.code,
    device: state.ConfigReducer.device
});

/** @namespace ScandiSmpagebuilder/Component/Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({default: dispatcher}) => dispatcher.update(breadcrumbs, dispatch)
    ),
    toggleBreadcrumbs: (isActive) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update([], dispatch)
        );
        dispatch(toggleBreadcrumbs(isActive));
    }
});

/** @namespace ScandiSmpagebuilder/Component/Route/HomePage/Container/HomePageContainer */
export class HomePageContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired
    };

    render() {
        const state = getStore().getState();
        const {
            code: storeCode
        } = state.ConfigReducer;

        return (

            <HomePageContainerCore
                {...this.props}
                currentStoreCode={storeCode}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
