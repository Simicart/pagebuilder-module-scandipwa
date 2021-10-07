import Link from '@scandipwa/scandipwa/src/component/Link/Link.component';
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import React from 'react';

import { useCategory } from '../../hook/useCategory';
import { CarefreeHorizontalScroll } from '../CarefreeHorizontalScroll/CarefreeHorizontalScroll';

import './CategoryScroll.scss';

export const imageStyle = {
    display: 'block',
    margin: '10px auto',
    width: '100%'
};

export const ROOT_ID = 2;

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/CategoryScroll/CategoryScroll */
export const CategoryScroll = (props) => {
    const {
        item,
        data,
        loading,
        canRender
    } = useCategory(props);

    if (canRender) {
        const cateChildren = data.category.children || [];
        const { dataParsed } = item;

        const content = cateChildren.map((x, i) => {
            const imgLink = dataParsed.image || x.image || '';
            if (!imgLink && false) {
                return '';
            }

            return (
                <Link
                  className="root"
                  to={ `${x.url}` }
                  style={ { width: '100%' } }
                  key={ i.toString() }
                >
                        { imgLink ? (
                            <img
                              src={ imgLink }
                              alt={ x.name }
                              style={ imageStyle }
                            />
                        ) : (
                            ''
                        ) }
                        <div className="cate_name">{ x.name }</div>
                </Link>
            );
        });

        const numberOfChildren = cateChildren.filter((x) => !!(dataParsed.image || x.image || '')).length;

        return (
            <CarefreeHorizontalScroll
              item={ item }
              pagingStyle={ {
                  marginTop: 5
              } }
              _class="category-scroll"
              _numberOfChildren={ numberOfChildren }
            >
                { content }
            </CarefreeHorizontalScroll>
        );
    } if (loading) {
        return <Loader isLoading />;
    }

    return '';
};
