import React from 'react';
// import GalleryItem from '@magento/venia-ui/lib/components/Gallery/item';
import { useProducts } from 'Component/Pagebuilder/hook/useProducts';
import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component';
import './ProductGrid.scss';
import Loader from '@scandipwa/scandipwa/src/component/Loader';

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
        data,
        wholeName
    } = useProducts({
        ...props,
        defaultPageSize: 8
    });

    const content = canRender ? data.products.items.map((productItem, indx) => {
        return <ProductCard key={indx.toString()}
                            product={productItem}
                            availableVisualOptions={['label']}
                            device={{}}
                            getAttribute={() => ''}
                            isBundleProductOutOfStock={() => false}
                            isConfigurableProductOutOfStock={() => false}
                            isPreview={true}
                            isWishlistEnabled={false}
                            productOrVariant={productItem}
                            thumbnail={productItem.image.url}
                            linkTo={productItem.url}
                            registerSharedElement={() => ''}
        />;
    }) : null;

    if (loading) {
        return <Loader isLoading={true}/>;
    }

    return (
        <div className={'product-grid'}>
            <div className={'name-container'}>
                <h3 className={'name-text'}>{wholeName}</h3>
            </div>
            <div className={'start-grid'}>
                {content}
            </div>
        </div>
    );
};

export default ProductGrid;
