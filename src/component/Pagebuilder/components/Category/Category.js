import React from 'react';
import Link from '@scandipwa/scandipwa/src/component/Link/Link.component';
import './index.scss';
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import { useCategory } from 'Component/Pagebuilder/hook/useCategory';

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
    } else if (loading) {
        return <Loader isLoading={true}/>;
    }
    return '';
}
