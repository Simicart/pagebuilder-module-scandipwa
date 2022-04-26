import React from 'react';

const ProductCard = React.lazy(() => import('@scandipwa/scandipwa/src/component/ProductCard/ProductCard.container'));

export const ProductCardWrapper = (props) => {
  const {normalizedProduct} = props

  return (
      <ProductCard
          product={normalizedProduct}
          availableVisualOptions={['label']}
          device={{}}
          getAttribute={() => ''}
          isBundleProductOutOfStock={() => false}
          isConfigurableProductOutOfStock={() => false}
          isPreview
          inStock={normalizedProduct.stock_item.in_stock}
          isWishlistEnabled={false}
          productOrVariant={normalizedProduct}
          thumbnail={normalizedProduct.image.url}
          linkTo={normalizedProduct.url}
          registerSharedElement={() => ''}
          getActiveProduct={() => ({
            ...normalizedProduct,
            // type_id: normalizedProduct.baseType
          })}
          hideCompareButton={true}
      />
  );
};

