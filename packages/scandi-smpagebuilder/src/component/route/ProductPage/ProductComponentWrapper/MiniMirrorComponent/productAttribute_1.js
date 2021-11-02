import React, { useRef } from 'react';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/ProductComponentWrapper/MiniMirrorComponent/ProductAttribute_1/ProductAttribute_1 */
export const ProductAttribute_1 = (props) => {
    const { item, product } = props;
    const { name } = item;

    const specialVars = Array.from(name.matchAll(/{{product.([\d\w.]+)}}/g) || [])
        .filter((result) => result.length >= 2)
        .reduce((acc, result) => {
            const originalPhrase = result[0];
            const traversalPathString = result[1];
            const traversalPath = traversalPathString.split('.').filter((x) => !!x);
            acc[originalPhrase] = traversalPath;
            return acc;
        }, {});

    const varMap = Object.entries(specialVars).map(([key, path]) => {
        const val = path.reduce((acc, cur) => (acc ? acc[cur] : null), product);
        return [key, val || ''];
    });

    const newStr = varMap.reduce((acc, map) => acc.replace(map[0], map[1]), name);

    if (newStr) {
        return <h3>{ newStr }</h3>;
    }

    return null;
};
