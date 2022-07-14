import {useState} from "react";
import {endPoint, integrationToken} from "../Pagebuilder.config";
import {usePbFinder} from 'tapita-pagebuilder-react';
import {useEffect} from "react";
import {CACHE_DURATION, useTapitaCaching} from "./useTapitaCaching";


export const useSimplifiedPageFinding = (props) => {
    const {
        currentStoreCode = 'default',
        path = '',
        cacheDuration = CACHE_DURATION.SHORT,
        cacheKey: _cacheKey = null
    } = props

    const [called, setCalled] = useState(false)
    const splitedPath = path.split('/');
    const currentPath = path === '/' ? path : (splitedPath.length > 0 ? splitedPath[splitedPath.length - 1] : path)

    const {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pageData
    } = usePbFinder({
        endPoint,
        integrationToken,
        storeCode: currentStoreCode,
        getPageItems: true
    });

    const {
        saveCache,
        getCache,
        makeKey,
        cacheStore
    } = useTapitaCaching({
        cacheDuration
    })

    const cacheKey = _cacheKey || makeKey({
        storeCode: currentStoreCode,
        urlPath: path,
        type: 'single_page'
    })

    const cacheData = getCache(cacheKey)

    const cachedPage = (function () {
        if (!cacheData) {
            return null
        }
        return cacheData

        if (cacheData && cacheData.data) {
            if (currentPath && cacheData.data.spb_page) {

                const {spb_page} = cacheData.data;
                if (spb_page.items && spb_page.items.length) {
                    const pbPages = JSON.parse(JSON.stringify(spb_page.items));
                    pbPages.sort(
                        (el1, el2) => parseInt(el2.priority) - parseInt(el1.priority),
                    );
                    const pageToFind = pbPages.find((item) => {
                        if (currentStoreCode && item.storeview_visibility) {
                            const storeViews = item.storeview_visibility.trim().split(',');
                            if (!storeViews.includes(currentStoreCode)) return false;
                        }
                        return item.url_path === currentPath;
                    });
                    return pageToFind
                }
            }
        }
        return null
    })()

    useEffect(() => {
        if (!pageMaskedId && !called && !cacheData) {
            findPage(currentPath);
            setCalled(true)
        }
    }, [currentPath, pageMaskedId, findPage]);

    useEffect(() => {
        if (!pbLoading && pageData && !cacheData) {
            saveCache(cacheKey, pageData)
        }
    }, [pageData, cacheKey, cacheData])

    const found = !!pageData || !!cacheData
    const notFound = !pbLoading && !found
    const cached = !!cacheData

    return {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pageData: cachedPage || pageData,
        notFound,
        called,
        found,
        cached,
        _p: pageData,
        _c: cachedPage,
        _s: cacheStore,
        cacheKey,
        cacheData
    }
}
