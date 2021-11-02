/* eslint-disable react/no-unused-state */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-ProductReviewListtheme
 */

import ContentWrapper from '@scandipwa/scandipwa/src/component/ContentWrapper';
import Loader from '@scandipwa/scandipwa/src/component/Loader/Loader.component';
import Popup from '@scandipwa/scandipwa/src/component/Popup/Popup.container';
import ProductActions from '@scandipwa/scandipwa/src/component/ProductActions';
import ProductCustomizableOptions from '@scandipwa/scandipwa/src/component/ProductCustomizableOptions';
import ProductLinks from '@scandipwa/scandipwa/src/component/ProductLinks';
import ProductReviewForm from '@scandipwa/scandipwa/src/component/ProductReviewForm/ProductReviewForm.container';
import { REVIEW_POPUP_ID } from '@scandipwa/scandipwa/src/component/ProductReviews/ProductReviews.config';
import ProductTabs from '@scandipwa/scandipwa/src/component/ProductTabs';
import NoMatchHandler from '@scandipwa/scandipwa/src/route/NoMatchHandler';
import {
    PRODUCT_ATTRIBUTES,
    PRODUCT_INFORMATION,
    PRODUCT_REVIEWS
} from '@scandipwa/scandipwa/src/route/ProductPage/ProductPage.config';
import { RELATED, UPSELL } from '@scandipwa/scandipwa/src/store/LinkedProducts/LinkedProducts.reducer';
import { ProductType } from '@scandipwa/scandipwa/src/type/ProductList';
import PropTypes from 'prop-types';
import { lazy, PureComponent, Suspense } from 'react';

import '@scandipwa/scandipwa/src/route/ProductPage/ProductPage.style';

export const ProductGallery = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-gallery" */
    '@scandipwa/scandipwa/src/component/ProductGallery'
));
export const ProductInformation = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-info" */
    '@scandipwa/scandipwa/src/component/ProductInformation'
));
export const ProductReviews = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-reviews" */
    '@scandipwa/scandipwa/src/component/ProductReviews'
));
export const ProductAttributes = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-attributes" */
    '@scandipwa/scandipwa/src/component/ProductAttributes'
));

/** @namespace ScandiSmpagebuilder/Component/Route/ProductPage/OriginalProductPage/ProductPage */
export class ProductPage extends PureComponent {
    static propTypes = {
        configurableVariantIndex: PropTypes.number.isRequired,
        productOrVariant: ProductType.isRequired,
        getLink: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        dataSource: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getSelectedCustomizableOptions: PropTypes.func.isRequired,
        setLinkedDownloadables: PropTypes.func.isRequired,
        setLinkedDownloadablesPrice: PropTypes.func.isRequired,
        productOptionsData: PropTypes.object.isRequired,
        setBundlePrice: PropTypes.func.isRequired,
        selectedLinkPrice: PropTypes.number.isRequired,
        selectedBundlePrice: PropTypes.number.isRequired,
        isMobile: PropTypes.bool.isRequired,
        isInformationTabEmpty: PropTypes.bool.isRequired,
        isAttributesTabEmpty: PropTypes.bool.isRequired,
        selectedBundlePriceExclTax: PropTypes.number.isRequired,
        selectedInitialBundlePrice: PropTypes.number.isRequired
    };

    tabMap = {
        [PRODUCT_INFORMATION]: {
            name: __('About'),
            shouldTabRender: () => {
                const { isInformationTabEmpty } = this.props;

                return !isInformationTabEmpty;
            },
            render: (key) => this.renderProductInformationTab(key)
        },
        [PRODUCT_ATTRIBUTES]: {
            name: __('Details'),
            shouldTabRender: () => {
                const { isAttributesTabEmpty } = this.props;

                return !isAttributesTabEmpty;
            },
            render: (key) => this.renderProductAttributesTab(key)
        },
        [PRODUCT_REVIEWS]: {
            name: __('Reviews'),
            // Return true since we always show 'Add review' button
            shouldTabRender: () => true,
            render: (key) => this.renderProductReviewsTab(key)
        }
    };

    renderProductPageContent() {
        const {
            configurableVariantIndex,
            parameters,
            getLink,
            dataSource,
            updateConfigurableVariant,
            productOrVariant,
            areDetailsLoaded,
            getSelectedCustomizableOptions,
            productOptionsData,
            setBundlePrice,
            selectedBundlePrice,
            selectedInitialBundlePrice,
            selectedBundlePriceExclTax,
            setLinkedDownloadables,
            setLinkedDownloadablesPrice,
            selectedLinkPrice
        } = this.props;

        return (
            <>
                <Suspense fallback={ <Loader /> }>
                    <ProductGallery
                      product={ productOrVariant }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                </Suspense>
                <ProductActions
                  getLink={ getLink }
                  updateConfigurableVariant={ updateConfigurableVariant }
                  product={ dataSource }
                  productOrVariant={ productOrVariant }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  configurableVariantIndex={ configurableVariantIndex }
                  getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                  productOptionsData={ productOptionsData }
                  setBundlePrice={ setBundlePrice }
                  selectedBundlePrice={ selectedBundlePrice }
                  selectedInitialBundlePrice={ selectedInitialBundlePrice }
                  selectedBundlePriceExclTax={ selectedBundlePriceExclTax }
                  setLinkedDownloadables={ setLinkedDownloadables }
                  setLinkedDownloadablesPrice={ setLinkedDownloadablesPrice }
                  selectedLinkPrice={ selectedLinkPrice }
                />
            </>
        );
    }

    renderCustomizableOptions() {
        const {
            dataSource: { options },
            getSelectedCustomizableOptions,
            productOptionsData,
            isMobile
        } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <ProductCustomizableOptions
              options={ options || [] }
              getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
              productOptionsData={ productOptionsData }
            />
        );
    }

    renderProductInformationTab(key) {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        return (
            <Suspense fallback={ <Loader /> } key={ key }>
                <ProductInformation
                  product={ { ...dataSource, parameters } }
                  areDetailsLoaded={ areDetailsLoaded }
                  key={ key }
                />
            </Suspense>
        );
    }

    renderProductAttributesTab(key) {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        return (
            <Suspense fallback={ <Loader /> } key={ key }>
                <ProductAttributes
                  product={ { ...dataSource, parameters } }
                  areDetailsLoaded={ areDetailsLoaded }
                  key={ key }
                />
            </Suspense>
        );
    }

    renderProductReviewsTab(key) {
        const {
            dataSource,
            areDetailsLoaded
        } = this.props;

        return (
            <Suspense fallback={ <Loader /> } key={ key }>
                <ProductReviews
                  product={ dataSource }
                  areDetailsLoaded={ areDetailsLoaded }
                  key={ key }
                />
            </Suspense>
        );
    }

    shouldTabsRender() {
        return Object.values(this.tabMap).filter(({ shouldTabRender }) => shouldTabRender());
    }

    renderProductTabs() {
        return (
            <ProductTabs tabs={ this.shouldTabsRender() } />
        );
    }

    renderAdditionalSections() {
        const {
            areDetailsLoaded
        } = this.props;

        return (
            <>
                { this.renderCustomizableOptions() }
                { this.renderProductTabs() }
                <ProductLinks
                  linkType={ RELATED }
                  title={ __('Recommended for you') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductLinks
                  linkType={ UPSELL }
                  title={ __('You might also like') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </>
        );
    }

    renderReviewPopup() {
        const { productOrVariant } = this.props;

        return (
            <Popup
              id={ REVIEW_POPUP_ID }
              mix={ { block: 'ProductReviews', elem: 'Popup' } }
            >
                <ProductReviewForm product={ productOrVariant } />
            </Popup>
        );
    }

    render() {
        return (
            <NoMatchHandler>
                <main
                  block="ProductPage"
                  aria-label="Product page"
                  itemScope
                  itemType="http://schema.org/Product"
                >
                    <ContentWrapper
                      wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                      label={ __('Main product details') }
                    >
                        { this.renderProductPageContent() }
                    </ContentWrapper>
                    { this.renderAdditionalSections() }
                    { this.renderReviewPopup() }
                </main>
            </NoMatchHandler>
        );
    }
}

export default ProductPage;
