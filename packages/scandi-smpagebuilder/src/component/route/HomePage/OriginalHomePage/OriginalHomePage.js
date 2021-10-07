/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
import Footer from '@scandipwa/scandipwa/src/component/Footer';
import InstallPrompt from '@scandipwa/scandipwa/src/component/InstallPrompt';
import { DEFAULT_STATE_NAME } from '@scandipwa/scandipwa/src/component/NavigationAbstract/NavigationAbstract.config';
import CmsPage from '@scandipwa/scandipwa/src/route/CmsPage';
import { changeNavigationState } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.reducer';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import '@scandipwa/scandipwa/src/route/HomePage/HomePage.style.scss';

/** @namespace ScandiSmpagebuilder/Component/Route/HomePage/OriginalHomePage/mapStateToProps */
export const mapStateToProps = (state) => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page
});

/** @namespace ScandiSmpagebuilder/Component/Route/HomePage/OriginalHomePage/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace ScandiSmpagebuilder/Component/Route/HomePage/OriginalHomePage/HomePageContainer */
export class HomePageContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }

    render() {
        return (
            <div block="HomePage">
                <InstallPrompt />
                <CmsPage { ...this.props } />
                <Footer isVisibleOnMobile />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
