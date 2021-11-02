import TextPlaceholder from '@scandipwa/scandipwa/src/component/TextPlaceholder';
import React from 'react';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/ProductName/ProductName */
export const ProductName = (props) => {
    const { product: { name } } = props;

    return (
        <h1 block="ProductActions" elem="Title" itemProp="name">
            <TextPlaceholder content={ name } length="medium" />
        </h1>
    );
};
