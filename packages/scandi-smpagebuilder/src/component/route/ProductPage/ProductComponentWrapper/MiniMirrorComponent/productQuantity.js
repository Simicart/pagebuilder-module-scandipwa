import Field from '@scandipwa/scandipwa/src/component/Field/Field.container';
import { GROUPED } from '@scandipwa/scandipwa/src/util/Product';
import React from 'react';

import { getMaxQuantity } from '../../productSurplus/getMaxQuantity';
import { getMinQuantity } from '../../productSurplus/getMinQuantity';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductQuantity/ProductQuantity */
export const ProductQuantity = (props) => {
    const {
        quantity,
        setQuantity,
        product: { type_id },
        configurableVariantIndex
    } = props;

    if (type_id === GROUPED) {
        return null;
    }

    const minQuantity = getMinQuantity(props);
    const maxQuantity = getMaxQuantity(props);

    return (
        <Field
          id="item_qty"
          name="item_qty"
          type="number"
          value={ quantity }
          max={ maxQuantity }
          min={ minQuantity }
          mix={ { block: 'ProductActions', elem: 'Qty' } }
          onChange={ setQuantity }
        />
    );
};
