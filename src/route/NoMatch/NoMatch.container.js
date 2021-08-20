import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import { NO_MATCH } from '@scandipwa/scandipwa/src/component/Header/Header.config';
import SharedTransitionContainer from '@scandipwa/scandipwa/src/component/SharedTransition/SharedTransition.unstated';
import { updateMeta } from '@scandipwa/scandipwa/src/store/Meta/Meta.action';
import { changeNavigationState } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.reducer';
import { updateNoMatch } from '@scandipwa/scandipwa/src/store/NoMatch/NoMatch.action';

import NoMatch from './NoMatch.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '@scandipwa/scandipwa/src/store/Breadcrumbs/Breadcrumbs.dispatcher'
    );

/** @namespace Route/NoMatch/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    updateNoMatch: (options) => dispatch(updateNoMatch(options))
});

/** @namespace Route/NoMatch/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({
    urlRewrite: state.UrlRewritesReducer.urlRewrite,
    currentStoreCode: state.ConfigReducer.code
});

/** @namespace Route/NoMatch/Container */
export class NoMatchContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        updateNoMatch: PropTypes.func.isRequired,
        urlRewrite: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.updateHeaderState();
        this.updateMeta();
        this.updateNoMatch();
    }

    updateHeaderState() {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: NO_MATCH,
            title: __('Page not found'),
            isHiddenOnMobile: true
        });
    }

    updateMeta() {
        const { updateMeta } = this.props;

        updateMeta({
            title: __('Page not found'),
            status_code: '404'
        });
    }

    updateNoMatch() {
        const { updateNoMatch } = this.props;

        updateNoMatch(true);
    }

    render() {
        return (
            <Subscribe to={[SharedTransitionContainer]}>
                {({ cleanUpTransition }) => (
                    <NoMatch
                        {...{
                            ...this.props,
                            cleanUpTransition
                        }}
                    />
                )}
            </Subscribe>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoMatchContainer);
