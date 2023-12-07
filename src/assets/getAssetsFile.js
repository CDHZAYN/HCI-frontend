const getAssetsFile = (name) =>{
    // console.log(new URL(`./${name}`, import.meta.url).href)
    return new URL(`./${name}`, import.meta.url).href
}

export default getAssetsFile
