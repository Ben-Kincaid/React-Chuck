export function setJoke(val) {
   
    return {
        type: "SET_JOKE",
        joke: val,
        loadStatus: 'Loading...!323'
    }
}


export function setCategory(val) {
    return {
        type: "SET_CAT",
        category: val
    }
}

export function setLoad(val) {
    return {
        type: "SET_LOAD",
        loadStatus: val
    }
}