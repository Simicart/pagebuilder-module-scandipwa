import React from 'react';
import { useQuery } from 'Route/CmsPage/useQuery';
import ProductListQuery from '@scandipwa/scandipwa/src/query/ProductList.query';

import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import './ProductList.scss';

const ProductList = props => {
    const {
        item,
        formatMessage
    } = props;
    let filterData = { category_id: { eq: '6' } };
    let sortData;
    let pageSize = 12;

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
            sortData = {};
            sortData[dataParsed.openProductsWidthSortAtt] = directionToSort;
        }
        if (dataParsed.openProductsWidthSortPageSize) {
            pageSize = parseInt(dataParsed.openProductsWidthSortPageSize);
        }
    }

    const q = ProductListQuery.getQuery({
        args: {
            filter: {
                categoryIds: parseInt(filterData.category_id.eq)
            },
            pageSize: pageSize,
            sort: sortData
        }
    });
    const {
        data,
        loading
    } = useQuery(q);

    if (data && data.products && data.products.items && data.products.items.length) {
        const name = formatMessage({ val: item.name });
        // const name = 'hello';
        return (
            <div className={'root product-list'}>
                <div className={'list-title'}
                >
                    {name}
                </div>
                <div className={'overall-scroll'}
                >
                    {
                        data.products.items.map((productItem, indx) => {
                            return <ProductCard key={indx.toString()}
                                                product={productItem}
                                                availableVisualOptions={['label']}
                                                device={{}}
                                                getAttribute={() => ''}
                                                isBundleProductOutOfStock={false}
                                                isConfigurableProductOutOfStock={() => false}
                                                isPreview={true}
                                                isWishlistEnabled={false}
                                                productOrVariant={productItem}
                                                thumbnail={productItem.image.url}
                                                linkTo={productItem.url}
                                                registerSharedElement={() => ''}
                            />;
                        })}

                </div>
            </div>
        );
    } else if (loading) {
        return null;
    }
    return null;
};

export default ProductList;
