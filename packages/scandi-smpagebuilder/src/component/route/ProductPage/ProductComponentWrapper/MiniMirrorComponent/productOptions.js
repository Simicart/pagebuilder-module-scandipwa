import ProductCustomizableOptions
    from '@scandipwa/scandipwa/src/component/ProductCustomizableOptions/ProductCustomizableOptions.container';
import { showNotification } from '@scandipwa/scandipwa/src/store/Notification/Notification.action';
import React from 'react';
import { connect } from 'react-redux';

import { getMaxQuantity } from '../../productSurplus/getMaxQuantity';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductOptions/mapStateToProps */
export const mapStateToProps = (state) => ({
    isEnabled: state.ConfigReducer.reviews_are_enabled,
    isGuestEnabled: state.ConfigReducer.reviews_allow_guest,
    device: state.ConfigReducer.device
});

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductOptions/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showInfoNotification: (message) => dispatch(showNotification('info', message))
});

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductOptions/_ProductOptions */
export const _ProductOptions = (props) => {
    const {
        product: {
            options,
            type_id = '',
            price_range = {}
        } = {},
        getSelectedCustomizableOptions,
        productOptionsData,
        device: { isMobile }
    } = props;

    if (isMobile) {
        return null;
    }

    const maxQuantity = getMaxQuantity(props);

    return (
        <section
          block="ProductActions"
          elem="Section"
          mods={ { type: 'customizable_options' } }
        >
            <ProductCustomizableOptions
              options={ options }
              getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
              productOptionsData={ productOptionsData }
              price_range={ price_range }
              type_id={ type_id }
              maxQuantity={ maxQuantity }
            />
        </section>
    );
};

export const ProductOptions = connect(mapStateToProps, mapDispatchToProps)(_ProductOptions);
