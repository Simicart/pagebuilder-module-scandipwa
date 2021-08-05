import React from 'react';
// import GalleryItem from '@magento/venia-ui/lib/components/Gallery/item';
import { useProducts } from 'Route/CmsPage/useProducts';

export const mapGalleryItem = item => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

const ProductGrid = props => {

    const {
        canRender,
        loading,
        data
    } = useProducts({
        ...props,
        defaultPageSize: 8
    });

    if (canRender) {
        return data.products.items.map((productItem, indx) => {
            return '';
            //TODO: change this
            // return <GalleryItem key={indx} item={mapGalleryItem(productItem)} classes={classes}/>;
        });
    } else if (loading) {
        return '';
    }
    return '';
};

export default ProductGrid;
