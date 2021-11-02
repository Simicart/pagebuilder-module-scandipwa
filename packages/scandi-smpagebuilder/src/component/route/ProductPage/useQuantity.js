import { useEffect, useState } from 'react';

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/UseQuantity/useQuantity */
export const useQuantity = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [groupedProductQuantity, setGroupedProductQuantity] = useState({});

    return {
        quantity,
        setQuantity,
        groupedProductQuantity,
        setGroupedProductQuantity
    };
};
