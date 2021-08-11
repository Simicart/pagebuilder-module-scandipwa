import React from 'react';
import ProductListQuery from '@scandipwa/scandipwa/src/query/ProductList.query';
import { useQuery } from 'Component/Pagebuilder/hook/useQuery';
import { makeSignature } from 'Component/Pagebuilder/utils/makeSignature';

const signatureType = 'products';

export const useProducts = (props) => {
    const {
        item,
        formatMessage,
        defaultPageSize = 12,
        beginCategory = null
    } = props;

    let filterData = { category_id: { eq: beginCategory } };
    let sortData;
    let pageSize = defaultPageSize;

    if (item.dataParsed) {
        const { dataParsed } = item;
        if (dataParsed.openProductsWidthSKUs) {
            let openProductsWidthSKUs = item.dataParsed.openProductsWidthSKUs;
            openProductsWidthSKUs = openProductsWidthSKUs.trim();
            openProductsWidthSKUs = openProductsWidthSKUs.split(',');
            filterData = {
                sku: {
                    in: openProductsWidthSKUs
                }
            };
        } else if (dataParsed.openCategoryProducts) {
            filterData = { category_id: { eq: String(dataParsed.openCategoryProducts) } };
        }
        if (dataParsed.openProductsWidthSortAtt) {
            const directionToSort = dataParsed.openProductsWidthSortDir ? dataParsed.openProductsWidthSortDir.toUpperCase() : 'ASC';
            if (dataParsed.openProductsWidthSortAtt) {
                sortData = {};
                // this is specific to _getArgumentsMap of ProductList.query.js. Change this for other flatform
                sortData['sortKey'] = dataParsed.openProductsWidthSortAtt;
                sortData['sortDirection'] = directionToSort;
            }
        }
        if (dataParsed.openProductsWidthSortPageSize) {
            pageSize = parseInt(dataParsed.openProductsWidthSortPageSize);
        }
    }

    const args = {
        args: {
            filter: {
                categoryIds: parseInt(filterData.category_id.eq)
            },
            pageSize: pageSize,
            sort: sortData || null
        }
    };

    const q = item && item.dataParsed ? ProductListQuery.getQuery(args) : null;

    const {
        data,
        loading,
        error,
        refetch
    } = useQuery(q, makeSignature(args, signatureType));

    const canRender = !!(data && data.products && data.products.items && data.products.items.length);

    const wholeName = formatMessage({ val: item.name });

    return {
        data,
        loading,
        item,
        formatMessage,
        filterData,
        sortData,
        pageSize,
        query: q,
        error,
        refetch,
        canRender,
        wholeName
    };
};
