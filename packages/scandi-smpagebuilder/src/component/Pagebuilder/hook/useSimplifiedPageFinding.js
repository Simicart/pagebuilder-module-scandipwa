import {useState} from "react";
import {endPoint, integrationToken} from "../Pagebuilder.config";
import {usePbFinder} from 'tapita-pagebuilder-react';
import {useEffect} from "react";
import {CACHE_DURATION, useTapitaCaching} from "./useTapitaCaching";


export const useSimplifiedPageFinding = (props) => {
    const {
        currentStoreCode = 'default',
        path ='',
        cacheDuration = CACHE_DURATION.SHORT,
        cacheKey: _cacheKey = null
    } = props

    const [called, setCalled] = useState(false)
    const splitedPath = path.split('/');
    const currentPath = path==='/'? path:(splitedPath.length>0? splitedPath[splitedPath.length-1]:path)

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
        urlPath: currentPath
    })

    const cacheData = getCache(cacheKey)

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
    }, [pageData, saveCache, cacheKey, cacheData])

    const found = !!pageData || !!cacheData
    const notFound = !pbLoading && !found
    const cached = !!cacheData

    return {
        loading: pbLoading,
        pageMaskedId,
        findPage,
        pageData: cacheData || pageData,
        notFound,
        called,
        found,
        cached
    }
}
