export const setLocalData = (key: string, data: any) => {

    try {
        localStorage.setItem(key, data)
    } catch (e) {
        console.log('setData - ', e)
        return false
    }
    return true;
};


export const getLocalData = (key: string) => {

    try {
        return localStorage.getItem(key)
    } catch (e) {
        console.log('setData - ', e)
        return false
    }
};


