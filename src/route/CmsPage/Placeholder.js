import React from 'react';

export function Placeholder(props) {
    return (
        <div>
            <h3>{ JSON.stringify(props, null, 2) }</h3>
        </div>
    );
}
