import React, { Fragment } from 'react';

import OrbitalDot from './icon/dot-circle.svg';
import SimpleGreyDot from './icon/dot.svg';

import './FashionableDotPagination.css';

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/CarefreeHorizontalScroll/FashionableDotPagination/SimpleDot */
export const SimpleDot = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClass = ['simple-grey-dot', className].join(' ');

    return <img className={ newClass } src={ SimpleGreyDot } alt="" { ...rest } />;
};

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/CarefreeHorizontalScroll/FashionableDotPagination/DotWithOrbital */
export const DotWithOrbital = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClass = ['orbital-dot', className].join(' ');

    return <img className={ newClass } src={ OrbitalDot } alt="" { ...rest } />;
};

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/CarefreeHorizontalScroll/FashionableDotPagination/HorizontalBar */
export const HorizontalBar = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClassName = ['small-horizontal-bar', className].join(' ');

    return <i className={ newClassName } { ...rest } />;
};

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/CarefreeHorizontalScroll/FashionableDotPagination/FashionableDotPagination */
export const FashionableDotPagination = (props) => {
    const {
        numberOfPages = 0,
        currentIndex = 0,
        onChangeIndex: _onChangeIndex,
        pagingStyle = {}
    } = props || {};

    const content = Array.from(Array(numberOfPages)
        .keys(), (x) => {
        const onChangeIndex = () => {
            // console.log(x)
            _onChangeIndex(x);
        };
        if (currentIndex === x) {
            if (currentIndex === 0) {
                return (
                    <Fragment key={ `${x}-${currentIndex }-${ numberOfPages}` }>
                        <DotWithOrbital key={ currentIndex.toString() } />
                        <HorizontalBar key="bar-1" />
                    </Fragment>
                );
            } if (currentIndex === numberOfPages - 1) {
                return (
                    <Fragment key={ `${x}-${currentIndex }-${ numberOfPages}` }>
                        <HorizontalBar key="bar-1" />
                        <DotWithOrbital key={ currentIndex.toString() } />
                    </Fragment>
                );
            }

            return (
                <Fragment key={ `${x}-${currentIndex }-${ numberOfPages}` }>
                        <HorizontalBar key="bar-1" />
                        <DotWithOrbital key={ currentIndex.toString() } />
                        <HorizontalBar key="bar-2" />
                </Fragment>
            );
        }

        return (
                <SimpleDot
                  key={ x.toString() }
                  className={ x === currentIndex ? 'active' : '' }
                  onClick={ onChangeIndex }
                />
        );
    });
    //
    // if (numberOfPages === 0) {
    //     return null;
    // }

    const newClass = 'fashionable-pagination-container';

    return (
        <div className={ newClass } style={ pagingStyle }>
            { content }
        </div>
    );
};
