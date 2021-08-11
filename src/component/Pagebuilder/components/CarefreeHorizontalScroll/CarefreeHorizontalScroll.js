import React, { useEffect, useRef, useState } from 'react';
import { FashionableDotPagination } from './FashionableDotPagination';
import { randomString } from './randomString';
import './index.scss';

export const CarefreeHorizontalScroll = (props) => {
    const {
        item,
        children,
        pagingStyle,
        _numberOfChildren,
        _class = ''
    } = props || {};
    const { name = 'Hello' } = item;
    const numberOfChildren =
        children instanceof Array ? children.length : children ? 1 : 0;

    const unqId = useRef(randomString()).current;

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (index) => {
        if (currentIndex !== index) {
            setCurrentIndex(index);
        }
    };

    const isPaginationBarVisible = !!(item.dataParsed &&
    item.dataParsed['show-pagination'] !== undefined
        ? item.dataParsed['show-pagination']
        : true);

    useEffect(() => {
        const index = currentIndex;
        if (numberOfChildren <= 1) {
            // no where to scroll
        } else if (children[index]) {
            const elements = document.querySelector(
                `.${unqId}.child-container`
            ).children;
            const target = elements.item(index);
            target.scrollIntoView({
                block: 'nearest',
                inline: 'start'
            });
        }
    }, [children, currentIndex, numberOfChildren, unqId]);

    return (
        <React.Fragment>
            <div className={`carefree-container ${_class}`}>
                <div className={'inner-container'}>
                    <div className={'title'}>{name}</div>
                    <div className={`${unqId} child-container`}>{children}</div>
                </div>
                {isPaginationBarVisible && (
                    <FashionableDotPagination
                        pagingStyle={pagingStyle}
                        numberOfPages={_numberOfChildren !== undefined ? _numberOfChildren : numberOfChildren}
                        currentIndex={currentIndex}
                        onChangeIndex={handleScroll}
                    />
                )}
            </div>
        </React.Fragment>
    );
};
