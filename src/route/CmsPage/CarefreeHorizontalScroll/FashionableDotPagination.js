import React from 'react';
import './FashionableDotPagination.css';

export const SimpleDot = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClass = ['simple-grey-dot', className].join(' ');

    return <img className={newClass} src={'/icon/dot.svg'} alt={''} {...rest} />;
};

export const DotWithOrbital = (props) => {
    const {
        className = '',
        ...rest
    } = props || {};
    const newClass = ['orbital-dot', className].join(' ');

    return <img className={newClass} src={'/icon/dot-circle.svg'} alt={''} {...rest} />;
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
                        <DotWithOrbital/>
                        <HorizontalBar/>
                    </React.Fragment>
                );
            } else if (currentIndex === numberOfPages - 1) {
                return (
                    <React.Fragment>
                        <HorizontalBar/>
                        <DotWithOrbital/>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <HorizontalBar/>
                        <DotWithOrbital/>
                        <HorizontalBar/>
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