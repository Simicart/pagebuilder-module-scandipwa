import React from "react";
import {LayoutTapita} from "../LayoutTapita";
import getStore from "@scandipwa/scandipwa/src/util/Store";
import {useTapitaCaching} from "../../../hook/useTapitaCaching";

export const CategoryLayout = (props) => {
    try {
        const dataSource = props && props.instance && props.instance.props && props.instance.props.category
        const productSku = null
        const productType = null
        const categoryIDs = dataSource ? [dataSource.id] : []
        const categoryHandles = dataSource ? [dataSource.url_key] : []

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
            <LayoutTapita {...props} {...metaData} type={1} cacheKey={cacheKey}/>
        )
    } catch (e) {
        console.warn(e)
        return null
    }
}
