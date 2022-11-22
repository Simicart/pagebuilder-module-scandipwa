import {useState} from "react";
import {endPoint, integrationToken} from "../Pagebuilder.config";
import {usePbFinder} from 'tapita-pagebuilder-react';
import {useEffect} from "react";
import {CACHE_DURATION, useTapitaCaching} from "./useTapitaCaching";
import {func} from "prop-types";
import {matchPathAndCode} from "../utils/matchPathAndCode";


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
        pageData,
        allPages
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
    })()

    const realPageData = (function () {
        if (pageData) {
            return pageData
        }
        if (allPages && allPages.data) {
            const pagesObj = allPages.data.spb_page
            const pages = pagesObj.items || []

            return pages.find(page => {
                const urlPath = page.url_path
                const storeVisibility = page.storeview_visibility
                if (storeVisibility &&
                    !(storeVisibility.trim().split(',').includes(currentStoreCode))) {
                    return false
                }
                return matchPathAndCode({
                    currentPath: path,
                    currentStoreCode,
                    targetPath: urlPath
                })
            })
        }
    })()

    const found = !!realPageData || !!cacheData
    const notFound = !pbLoading && !found
    const cached = !!cacheData

    useEffect(() => {
        if (!pageMaskedId && !called && !cacheData) {
            findPage(currentPath);
            setCalled(true)
        }
    }, [currentPath, pageMaskedId, findPage]);

    useEffect(() => {
        if (!pbLoading && realPageData && !cacheData) {
            saveCache(cacheKey, realPageData)
        }
    }, [pageData, cacheKey, cacheData])

    return {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pageData: cachedPage || realPageData,
        notFound,
        called,
        found,
        cached,
        _p: realPageData,
        _c: cachedPage,
        _s: cacheStore,
        cacheKey,
        cacheData
    }
}
