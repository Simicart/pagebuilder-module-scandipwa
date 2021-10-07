import CategoryQuery from '@scandipwa/scandipwa/src/query/Category.query';

import { makeSignature } from '../utils/makeSignature';
import { useQuery } from './useQuery';

export const imageStyle = {
    display: 'block',
    margin: '10px auto',
    width: '100%'
};

export const signatureType = 'category';

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseCategory/useCategory */
export const useCategory = (props) => {
    const { item } = props;
    const idToFind = item && item.dataParsed ? parseInt(item.dataParsed.openCategoryProducts, 10) : null;

    const args = { categoryIds: idToFind };

    const q = idToFind ? CategoryQuery.getQuery(args) : null;
    const {
        data,
        loading
    } = useQuery(q, makeSignature(args, signatureType));

    const canRender = item
        && item.dataParsed
        && item.dataParsed.openCategoryProducts
        && data
        && data.category;

    const foundCate = data ? data.category : null;

    return {
        foundCate,
        data,
        loading,
        q,
        canRender,
        item,
        imageStyle
    };
};
