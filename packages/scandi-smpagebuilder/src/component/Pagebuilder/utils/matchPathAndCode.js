const stripSlash = (str) => {
    if (!str || str.length === 1) {
        return str
    }
    const startSlash = str[0] === '/'
    const endSlash = str[str.length - 1] === '/'
    return str.slice(startSlash ? 1 : 0, str.length - (endSlash ? 1 : 0))
}

export const matchPathAndCode = (ops) => {
    const {
        currentPath,
        currentStoreCode,
        targetPath
    } = ops
    if (!currentPath) {
        return false
    }
    const cleanPath = stripSlash(currentPath)

    const splitedPathArr = cleanPath.split('/')
    const lastPath = splitedPathArr[splitedPathArr.length - 1]

    const cleanPathWithCode = `${currentStoreCode}/${cleanPath}`
    const cleanLastPathWithCode = `${currentStoreCode}/${lastPath}`

    const cleanTargetPath = stripSlash(targetPath)

    return (
        cleanTargetPath === cleanPath ||
        cleanTargetPath === cleanPathWithCode ||
        cleanTargetPath === lastPath ||
        cleanTargetPath === cleanLastPathWithCode
    );

}
