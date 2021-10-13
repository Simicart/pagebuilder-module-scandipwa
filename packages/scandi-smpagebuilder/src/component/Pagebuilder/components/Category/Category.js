import Link from '@scandipwa/scandipwa/src/component/Link/Link.component';
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import React from 'react';

import { useCategory } from '../../hook/useCategory';

import '../abc.scss';

export function Category(props) {
    const {
        canRender,
        item,
        imageStyle,
        foundCate,
        loading
    } = useCategory(props);

    if (canRender) {
        if (foundCate) {
            const { dataParsed } = item;

            return (
                <Link
                  className="root category"
                  to={ foundCate.url }
                  style={ { width: '100%' } }
                >
                        { dataParsed.image ? (
                            <img
                              src={ dataParsed.image }
                              alt={ foundCate.name }
                              style={ imageStyle }
                            />
                        ) : (
                            ''
                        ) }
                        <div className="cate_name">{ foundCate.name }</div>
                </Link>

            );
        }
    } else if (loading) {
        return <Loader isLoading />;
    }

    return null;
}
