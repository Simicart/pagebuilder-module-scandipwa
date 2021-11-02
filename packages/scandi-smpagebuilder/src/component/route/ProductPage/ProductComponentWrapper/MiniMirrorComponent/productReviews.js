import OriginalProductReviews from '@scandipwa/scandipwa/src/component/ProductReviews/ProductReviews.component';
import { showNotification } from '@scandipwa/scandipwa/src/store/Notification/Notification.action';
import React from 'react';
import { connect } from 'react-redux';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductReviews/mapStateToProps */
export const mapStateToProps = (state) => ({
    isEnabled: state.ConfigReducer.reviews_are_enabled,
    isGuestEnabled: state.ConfigReducer.reviews_allow_guest,
    device: state.ConfigReducer.device
});

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductReviews/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showInfoNotification: (message) => dispatch(showNotification('info', message))
});

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductReviews/_ProductReviews */
export const _ProductReviews = (props) => {
    const { isEnabled } = props;

    if (!isEnabled) {
        return null;
    }

    return (
        <div>
            <OriginalProductReviews { ...props } />
        </div>
    );
};

export const ProductReviews = connect(mapStateToProps, mapDispatchToProps)(_ProductReviews);
