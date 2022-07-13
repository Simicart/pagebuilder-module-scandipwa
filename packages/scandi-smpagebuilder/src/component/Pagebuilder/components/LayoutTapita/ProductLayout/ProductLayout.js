import React from "react";
import {LayoutTapita} from "../LayoutTapita";
import getStore from "@scandipwa/scandipwa/src/util/Store";
import {useTapitaCaching} from "../../../hook/useTapitaCaching";

export const ProductLayout = (props) => {
    try {
        const dataSource = props && props.instance && props.instance.props && props.instance.props.dataSource
        const productSku = dataSource && dataSource.sku
        const productType = dataSource && dataSource.type_id
        const categories = (dataSource && dataSource.categories) || []
        const categoryIDs = categories.map(c => c.id)
        const categoryHandles = categories.map(c => c.url).map(url => {
            if (!url) {
                return null
            }
            const directoryList = url.split('/')
            if (!directoryList.length) {
                return null
            }
            const lastDirectory = directoryList[directoryList.length - 1]
            const extensionList = lastDirectory.split('.')
            if (!extensionList.length) {
                return null
            }
            return extensionList[0]
        }).filter(handle => handle)

        const state = getStore().getState();
        const {
            code: storeCode
        } = state.ConfigReducer;

        const {makeKey} = useTapitaCaching()

        const cacheKey = makeKey()

        const metaData = {
            productSku,
            productType,
            categoryIDs,
            categoryHandles
        }

        return (
            <LayoutTapita {...props} {...metaData} cacheKey={cacheKey}/>
        )
    } catch (e) {
        console.warn(e)
        return null
    }
}
