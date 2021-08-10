import React from 'react';
import SimpleGreyDot from './icon/dot.svg';
import OrbitalDot from './icon/dot-circle.svg';
import './FashionableDotPagination.css';

export const SimpleDot = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClass = ['simple-grey-dot', className].join(' ');

    return <img className={newClass} src={SimpleGreyDot} alt={''} {...rest} />;
};

export const DotWithOrbital = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClass = ['orbital-dot', className].join(' ');

    return <img className={newClass} src={OrbitalDot} alt={''} {...rest} />;
};

export const HorizontalBar = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClassName = ['small-horizontal-bar', className].join(' ');

    return <i className={newClassName} {...rest} />;
};

export const FashionableDotPagination = (props) => {
    const {
        numberOfPages = 0,
        currentIndex = 0,
        onChangeIndex: _onChangeIndex,
        pagingStyle = {}
    } = props || {};

    const content = [...Array(numberOfPages)
        .keys()].map((x) => {
        const onChangeIndex = () => _onChangeIndex(x);
        if (currentIndex === x) {
            if (currentIndex === 0) {
                return (
                    <React.Fragment>
                        <DotWithOrbital key={currentIndex.toString()}/>
                        <HorizontalBar key={'bar-1'}/>
                    </React.Fragment>
                );
            } else if (currentIndex === numberOfPages - 1) {
                return (
                    <React.Fragment>
                        <HorizontalBar key={'bar-1'}/>
                        <DotWithOrbital key={currentIndex.toString()}/>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <HorizontalBar key={'bar-1'}/>
                        <DotWithOrbital key={currentIndex.toString()}/>
                        <HorizontalBar key={'bar-2'}/>
                    </React.Fragment>
                );
            }
        } else {
            return (
                <SimpleDot
                    key={x.toString()}
                    className={x === currentIndex ? 'active' : ''}
                    onClick={onChangeIndex}
                />
            );
        }
    });

    if (numberOfPages === 0) {
        return '';
    }

    const newClass = 'fashionable-pagination-container';

    return (
        <div className={newClass} style={pagingStyle}>
            {content}
        </div>
    );
};
