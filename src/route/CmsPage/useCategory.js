import React, { useState, useEffect } from 'react';
import CategoryQuery from '@scandipwa/scandipwa/src/query/Category.query';
import { useQuery } from 'Route/CmsPage/useQuery';

const imageStyle = {
    display: 'block',
    margin: '10px auto',
    width: '100%'
};

export const useCategory = (props) => {
    const { item } = props;
    const idToFind = item && item.dataParsed ? parseInt(item.dataParsed.openCategoryProducts) : null;

    const q = idToFind ? CategoryQuery.getQuery({ categoryIds: idToFind }) : null;
    const {
        data,
        loading,
        error
    } = useQuery(q);

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
