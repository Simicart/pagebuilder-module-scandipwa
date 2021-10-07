import React, { useEffect, useRef, useState } from 'react';

import { useCarefreeDots } from '../../hook/useCarefreeDots';
import { FashionableDotPagination } from './FashionableDotPagination';
import { randomString } from './randomString';

import './index.scss';

export let slidedTheSlider = false;

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/CarefreeHorizontalScroll/CarefreeHorizontalScroll */
export const CarefreeHorizontalScroll = (props) => {
    const {
        item,
        children,
        pagingStyle,
        _numberOfChildren,
        _class = ''
    } = props || {};
    const { name = 'Hello' } = item;
    const numberOfChildren = children instanceof Array ? children.length : children ? 1 : 0;

    const unqId = useRef(randomString()).current;
    const { numberOfSteps } = useCarefreeDots({
        ...props,
        unqId
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (index) => {
        if (currentIndex !== index) {
            setCurrentIndex(index);
        }
    };

    const isPaginationBarVisible = !!(item.dataParsed
    && item.dataParsed.showSliderIndicator !== undefined
        ? item.dataParsed.showSliderIndicator
        : true);

    useEffect(() => {
        const index = currentIndex;

        if (index === 0) {
            if (!slidedTheSlider) {
                return;
            }
        } else {
            slidedTheSlider = true;
        }

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
        <div className={ `carefree-container ${_class}` }>
            <div className="inner-container">
                <div className="title">{ name }</div>
                <div className={ `${unqId} child-container` }>{ children }</div>
            </div>
            { (isPaginationBarVisible || true) && (
                <FashionableDotPagination
                  pagingStyle={ pagingStyle }
                  numberOfPages={ numberOfSteps }
                  currentIndex={ currentIndex }
                  onChangeIndex={ handleScroll }
                />
            ) }
        </div>
    );
};
