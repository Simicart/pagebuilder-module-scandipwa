import React from 'react';
import CategoryQuery from '@scandipwa/scandipwa/src/query/Category.query';
import { useQuery } from 'Component/Pagebuilder/hook/useQuery';
import { makeSignature } from 'Component/Pagebuilder/utils/makeSignature';

const imageStyle = {
    display: 'block',
    margin: '10px auto',
    width: '100%'
};

const signatureType = 'category';

export const useCategory = (props) => {
    const { item } = props;
    const idToFind = item && item.dataParsed ? parseInt(item.dataParsed.openCategoryProducts) : null;

    const args = { categoryIds: idToFind };
    const q = idToFind ? CategoryQuery.getQuery(args) : null;
    const {
        data,
        loading
    } = useQuery(q, makeSignature(args, signatureType));

    const canRender = item &&
        item.dataParsed &&
        item.dataParsed.openCategoryProducts
        &&
        data &&
        data.category;

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
