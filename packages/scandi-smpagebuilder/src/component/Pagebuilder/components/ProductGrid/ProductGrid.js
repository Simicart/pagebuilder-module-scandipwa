import Loader from '@scandipwa/scandipwa/src/component/Loader';
import React from 'react';

import { useProducts } from '../../hook/useProducts';

import '../abe.scss';

export const ProductCard = React.lazy(() => import('@scandipwa/scandipwa/src/component/ProductCard/ProductCard.component'));

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductGrid/mapGalleryItem */
export const mapGalleryItem = (item) => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Components/ProductGrid/ProductGrid */
export const ProductGrid = (props) => {
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
        const pOp = (productItem?.configurable_options || []).map((x) => ({
            ...x,
            attribute_code: x.attribute_code,
            attribute_values: x.values
        }));

        return (
            <ProductCard
              key={ indx.toString() }
              product={ {
                  ...productItem,
                  options: productItem?.options || [],
                  configurable_options: pOp,
                  variants: (productItem.variants || []).map((x) => x.product)
              } }
              availableVisualOptions={ ['label'] }
              device={ {} }
              getAttribute={ () => '' }
              isBundleProductOutOfStock={ () => false }
              isConfigurableProductOutOfStock={ () => false }
              isPreview
              isWishlistEnabled={ false }
              productOrVariant={ productItem }
              thumbnail={ productItem.image.url }
              linkTo={ productItem.url }
              registerSharedElement={ () => '' }
            />
        );
    }) : null;

    if (loading) {
        return <Loader isLoading />;
    }

    return (
        // <div className="product-grid">
        //     <div className="name-container">
        //         <h3 className="name-text">{ wholeName }</h3>
        //     </div>
        //     <div className="start-grid">
        <>
                { content }
        </>
    // </div>
        // </div>
    );
};

export default ProductGrid;
