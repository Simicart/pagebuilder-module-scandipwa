import React from "react";
import {LayoutTapita} from "../LayoutTapita";

export const ProductLayout = (props) => {
    const dataSource = props && props.instance && props.instance.props && props.instance.props.dataSource

    const productSku = dataSource && dataSource.sku
    const productType = dataSource && dataSource.type_id
    const categories = (dataSource && dataSource.categories) || []
    const categoryIDs = categories.map(c => c.id)
    const categoryHandles = categories.map(c => c.url).map(url => {
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

    const metaData = {
        productSku,
        productType,
        categoryIDs,
        categoryHandles
    }

    return (
        <LayoutTapita {...props} {...metaData}/>
    )
}
