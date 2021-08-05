import React, { useState } from 'react';
import CategoryQuery from '@scandipwa/scandipwa/src/query/Category.query';
import { useQuery } from 'Route/CmsPage/useQuery';
import Link from '@scandipwa/scandipwa/src/component/Link/Link.component';
import './index.scss';

export function Category(props) {
    const { item } = props;
    const idToFind = parseInt(item && item.dataParsed ? item.dataParsed.openCategoryProducts : null);

    const q = idToFind ? CategoryQuery.getQuery({ categoryIds: idToFind }) : null;
    const {
        data
    } = useQuery(q);

    if (
        item &&
        item.dataParsed &&
        item.dataParsed.openCategoryProducts
        &&
        data &&
        data.category
    ) {
        const foundCate = data.category;

        if (foundCate) {
            const { dataParsed } = item;
            const imageStyle = {
                display: 'block',
                margin: '10px auto',
                width: '100%'
            };

            return (
                <React.Fragment>
                    <Link
                        className={'root category'}
                        to={foundCate.url}
                        style={{ width: '100%' }}
                    >
                        {dataParsed.image ? (
                            <img
                                src={dataParsed.image}
                                alt={foundCate.name}
                                style={imageStyle}
                            />
                        ) : (
                            ''
                        )}
                        <div className={'cate_name'}>{foundCate.name}</div>
                    </Link>
                </React.Fragment>

            );
        }
    }
    return '';
}
