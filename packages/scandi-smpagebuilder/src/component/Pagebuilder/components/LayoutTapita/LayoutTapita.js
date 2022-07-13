import {PageBuilderComponent} from 'tapita-pagebuilder-react';
import InstallPrompt from "@scandipwa/scandipwa/src/component/InstallPrompt";
import {Category} from "../Category/Category";
import ProductList from "../ProductList/ProductList";
import ProductGrid from "../ProductGrid/ProductGrid";
import {ProductScroll} from "../ProductScroll/ProductScroll";
import {CategoryScroll} from "../CategoryScroll/CategoryScroll";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {domain, endPoint, integrationToken} from "../../Pagebuilder.config";
import getStore from "@scandipwa/scandipwa/src/util/Store";
import {useTapitaCaching} from "../../hook/useTapitaCaching";

const urlBase = `${domain}pb/publishedpb/?integrationToken=`

export const LayoutTapita = (props) => {
    const {
        lazy,
        type = 0,
        layoutFilter = 1,
        productSku,
        productType,
        categoryIDs = [],
        categoryHandles = [],
        cacheKey = null
    } = props || {}

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const {
        saveCache,
        getCache,
    } = useTapitaCaching()

    const fetchPublishedTapita = useCallback(async () => {
        setLoading(true)
        return fetch(urlBase + integrationToken,
            {
                cache: 'force-cache'
            })
            .then(res => {
                if (res.status >= 400) {
                    throw res.statusText
                } else {
                    return res.json()
                }
            })
            .then(json => {
                setLoading(false)
                setData(json)
                saveCache(cacheKey, json)
            })
            .catch(err => {
                setLoading(false)
                setError(err)
            })
    }, [setLoading, setData, setError, urlBase, cacheKey])

    const cacheData = cacheKey ? getCache(cacheKey) : null

    useEffect(() => {
        if (!lazy && !cacheData && !loading && !data) {
            fetchPublishedTapita()
        }
    }, [lazy, fetchPublishedTapita, cacheData, cacheKey])

    const state = getStore().getState();
    const {
        code: storeCode
    } = state.ConfigReducer;

    const page = useMemo(() => {
        const currentData = cacheData ? cacheData.data : data
        if (!currentData) {
            return null
        }
        const catalog = currentData.data && currentData.data.catalog_builder_page
        if (!catalog) {
            return null
        }
        const items = catalog.items
        if (!items) {
            return null
        }
        const product = {}
        // filter by type, applyTo and storeview
        const validCatalogs = items.filter(c => {
            if (!(c.type_id === type && c.status === 1)) {
                return false
            }

            if (storeCode && c.storeview_visibility) {
                const storeViews = c.storeview_visibility
                    .trim()
                    .split(',');
                if (!storeViews.includes(storeCode)) return false;
            }

            if (c.apply_to) {
                let apply_to = c.apply_to.replace(/\s/g, '');
                apply_to = apply_to.split(',');
                if (apply_to.length) {
                    c.apply_by = apply_to[0];
                    if (
                        apply_to[0] === 'product_sku' &&
                        apply_to.includes(productSku) &&
                        productSku
                    ) {
                        return true;
                    } else if (
                        apply_to[0] === 'product_type' &&
                        apply_to.includes(productType) &&
                        productType
                    ) {
                        return true;
                    } else if (
                        apply_to[0] === 'category_id' &&
                        categoryIDs &&
                        categoryIDs.length
                    ) {
                        const p = apply_to.slice(1)
                        if (!p.length) {
                            return true
                        }
                        return p.some(a => {
                            return categoryIDs.includes(Number.parseInt(a))
                        })
                    } else if (
                        apply_to[0] === 'collection_handle' &&
                        categoryHandles &&
                        categoryHandles.length
                    ) {
                        const p = apply_to.slice(1)
                        if (!p.length) {
                            return true
                        }
                        return p.some(a => {
                            return categoryHandles.includes(a)
                        })
                    }
                    return false
                } else {
                    return true
                }
            } else {
                return true;
            }
        })
        // sort page based on prior and handle
        const prioritySortedCatalogs = validCatalogs.sort((el1, el2) => {
            if (el1.apply_by) {
                if (el2.apply_by) {
                    //if equal, then compare priority below
                    if (el2.apply_by !== el1.apply_by) {
                        //if not equal, SKU > product type > category ids
                        const valueTable = {
                            product_sku: 5,
                            product_type: 4,
                            category_id: 3
                        };
                        return (
                            valueTable[el2.apply_by] -
                            valueTable[el1.apply_by]
                        );
                    }
                } else {
                    //if one has and one does not have apply_by, then use the one with apply_by
                    return -1;
                }
            } else if (el2.apply_by) {
                return 1;
            }
            return parseInt(el2.priority) - parseInt(el1.priority);
        })
        return prioritySortedCatalogs.length > 0 ? prioritySortedCatalogs[0] : null
    }, [data, cacheData])

    if (page) {
        return (
            <div block="HomePage">
                <PageBuilderComponent
                    pageData={page}
                    endPoint={endPoint}
                    toPreview={false}
                    Category={Category}
                    ProductList={ProductList}
                    ProductGrid={ProductGrid}
                    ProductScroll={ProductScroll}
                    CategoryScroll={CategoryScroll}
                    layoutFilter={layoutFilter}
                />
            </div>
        );
    }
    return null
}
