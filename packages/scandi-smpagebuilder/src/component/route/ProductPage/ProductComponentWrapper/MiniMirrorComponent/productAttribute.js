import ProductConfigurableAttributes
    from '@scandipwa/scandipwa/src/component/ProductConfigurableAttributes/ProductConfigurableAttributes.container';
import { CONFIGURABLE, filterConfigurableOptions } from '@scandipwa/scandipwa/src/util/Product';
import React, { useRef } from 'react';

import { isInStock } from '../../productSurplus/isInStock';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductAttribute/ProductAttribute */
export const ProductAttribute = (props) => {
    const {
        updateConfigurableVariant,
        parameters,
        areDetailsLoaded,
        product: { configurable_options = {}, type_id, variants = {} }
    } = props;

    const inStock = isInStock(props);

    const configurableOptionsRef = useRef(null);

    if (type_id !== CONFIGURABLE) {
        return null;
    }

    return (
        <div
          ref={ configurableOptionsRef }
          block="ProductActions"
          elem="AttributesWrapper"
        >
            <ProductConfigurableAttributes
                // eslint-disable-next-line no-magic-numbers
              mix={ { block: 'ProductActions', elem: 'Attributes' } }
              isReady={ areDetailsLoaded }
              parameters={ parameters }
              variants={ variants }
              updateConfigurableVariant={ updateConfigurableVariant }
              configurable_options={ filterConfigurableOptions(configurable_options, variants) }
              isContentExpanded
              inStock={ inStock }
            />
        </div>
    );
};
