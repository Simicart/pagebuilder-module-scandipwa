import { ProductAddToCart } from './MiniMirrorComponent/productAddToCart';
import { ProductAttribute } from './MiniMirrorComponent/productAttribute';
import { ProductAttribute_1 } from './MiniMirrorComponent/productAttribute_1';
import { ProductDescription } from './MiniMirrorComponent/productDescription';
import { ProductGallery } from './MiniMirrorComponent/productGallery';
import { ProductName } from './MiniMirrorComponent/productName';
import { ProductOptions } from './MiniMirrorComponent/productOptions';
import { ProductPrice } from './MiniMirrorComponent/productPrice';
import { ProductQuantity } from './MiniMirrorComponent/productQuantity';
import { ProductReviews } from './MiniMirrorComponent/productReviews';
import { ProductStock } from './MiniMirrorComponent/productStock';
import { ProductWishListButton } from './MiniMirrorComponent/productWishListButton';
import { RelatedProduct } from './MiniMirrorComponent/relatedProduct';

export const productDetailTypeMap = {
    productbuilder_productname: ProductName,
    productbuilder_productprice: ProductPrice,
    productbuilder_productstock: ProductStock,
    productbuilder_productimage: ProductGallery,
    productbuilder_productaddcart: ProductAddToCart,
    productbuilder_productaddwishlist: ProductWishListButton,
    productbuilder_productqty: ProductQuantity,
    productbuilder_productoptions: ProductOptions,
    productbuilder_productdesc: ProductDescription,
    // should not override breadcrumb because it is not a component of product page
    productbuilder_productbreadcrumb: null,
    productbuilder_productattribute: ProductAttribute_1,
    // productbuilder_productreview: ProductReviews,
    productbuilder_relatedproducts: RelatedProduct
};
