import React from "react";
import {LayoutTapita} from "../LayoutTapita";
import {useLocation} from "../../../hook/useLocation";

export const CategoryLayout = (props) => {
    const dataSource = props && props.instance && props.instance.props && props.instance.props.category

    const productSku = null
    const productType = null
    const categoryIDs = dataSource ? [dataSource.id] : []
    const categoryHandles = dataSource ? [dataSource.url_key] : []

    const currentPath = useLocation();

    const metaData = {
        productSku,
        productType,
        categoryIDs,
        categoryHandles
    }

    return (
        <LayoutTapita {...props} {...metaData} type={1}/>
    )
}
