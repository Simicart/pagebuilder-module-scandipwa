import {makeId} from "../utils/makeId";
import {useCallback, useRef} from "react";
import * as url from "url";

export const CACHE_TYPE = {
    IN_MEM: 1,
}


export const CACHE_DURATION = {
    NO_CACHE: 0,
    RAPID: 60 * 1000,
    SHORT: 5 * 60 * 1000,
    MEDIUM: 15 * 60 * 1000,
    LONG: 60 * 60 * 1000,
    SUPER_LONG: 60 * 60 * 60 * 1000,
}

export const GLOBAL_CACHING_NAMESPACE = makeId()

const cacheStore = {}

export const useTapitaCaching = (props) => {
    const {
        type = CACHE_TYPE.IN_MEM,
        cacheDuration = CACHE_DURATION.SHORT,
        namespace = GLOBAL_CACHING_NAMESPACE,
        extendOnVisit = CACHE_DURATION.NO_CACHE
    } = props || {}

    const usageCountRef = useRef(0)

    const cleanCache = useCallback(() => {
        const visitTimestamp = Date.now()
        let count = 0
        Object.keys(cacheStore).forEach(key => {
            const b = cacheStore[key]
            if (b && b.expire > visitTimestamp) {
                cacheStore[key] = null
                count += 1
            }
        })
        usageCountRef.current = 0
        return count
    }, [cacheStore, usageCountRef])

    const saveCache = useCallback((key, data) => {
        if (!cacheStore[namespace]) {
            cacheStore[namespace] = {}
        }
        cacheStore[namespace][key] = {
            data: data,
            expire: Date.now() + cacheDuration,
        }
        usageCountRef.current += 2
        if (usageCountRef.current > 30) {
            cleanCache()
        }
    }, [cacheStore, namespace, cacheDuration, usageCountRef, cleanCache])

    const getCache = useCallback((key) => {
        if (!cacheStore[namespace]) {
            return null
        }
        const retrievalBlock = cacheStore[namespace][key]
        if (!retrievalBlock) {
            return null
        }
        const timestamp = Date.now()
        if (retrievalBlock.expire >= timestamp) {
            usageCountRef.current += 1
            retrievalBlock.expire = timestamp + extendOnVisit
            return retrievalBlock.data
        } else {
            cacheStore[namespace][key] = null
            usageCountRef.current -= 1
            return null
        }
    }, [cacheStore, namespace, usageCountRef])


    const countEntry = useCallback(() => {
        return Object.values(cacheStore).filter(c => c).length
    }, [cacheStore])

    const makeKey = useCallback(({storeCode = '', urlPath = ''}) => {
        return encodeURIComponent(`${storeCode}||${urlPath}`)
    }, [])

    return {
        type,
        cacheDuration,
        namespace,
        saveCache,
        getCache,
        cleanCache,
        countEntry,
        makeKey,
        cacheStore
    }
}
