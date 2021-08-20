import React, { PureComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { endPoint, integrationToken } from 'Component/Pagebuilder/Pagebuilder.config';
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import OriginalHomePage from './OriginalHomePage/OriginalHomePage';
import { usePbFinder } from 'simi-pagebuilder-react';
import { useLocation } from 'Component/Pagebuilder/hook/useLocation';
import { PagebuilderHomePageWrapperComponent } from 'Route/HomePage/PagebuilderWrapper/PagebuilderHomePageWrapper.component';
import 'Component/Pagebuilder/baseStyle.scss';
import PropTypes from 'prop-types';
import { TOP_NAVIGATION_TYPE } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.reducer';
import { changeNavigationState } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.action';

export function HomePageContainer(props) {
    const { changeHeaderState, currentStoreCode } = props;

    const {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pageData
    } = usePbFinder({
        endPoint,
        integrationToken,
        storeCode: currentStoreCode,
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
                endPoint={endPoint}
                currentStoreCode={currentStoreCode}
            />
        );
    } else if (pageMaskedId === 'notfound') {
        return <OriginalHomePage {...props}/>;
    }
    return null;
}

/** @namespace Route/HomePage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page,
    currentStoreCode: state.ConfigReducer.code
});

/** @namespace Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

export class HomePageContainerWrapper extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired
    };

    render() {
        return (
            <HomePageContainer {...this.props}/>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainerWrapper);
