import {getLocalData} from "../helpers/storage-helpers";
import axios from 'axios';
// let realScope = 'admin'

const fetchInstance = async (url, method, instance, tkn = null, isAxios = false) => {
    // if (url === BASE_URL + "api/scope/auth/login") {
    //     realScope = instance.scope
    // }
    const token = tkn ? tkn : getLocalData("token");
    // const realScope = lScope ? lScope : 'customer'

    if (isAxios) {
        axios.defaults.headers.post['Authorization'] = token // for POST requests
        return axios.post(url.replace('scope', process.env.REACT_APP_SERVICE_SCOPE), instance)
            .then(res => {

                console.log('res1 =', res)
                if (res?.status === 401) {

                    const query = new URLSearchParams(window.location.search);
                    const mobileToken = query.get('mobiletoken')
                    if (!mobileToken){
                        localStorage.clear()
                        window.location.url = '/'
                        window.location.reload()

                    }
                }

                return res.data
            })
            .catch(e => {
                console.log('e1 =', e)
                if (e?.request?.status === 401) {

                    const query = new URLSearchParams(window.location.search);
                    const mobileToken = query.get('mobiletoken')
                    if (!mobileToken){
                        localStorage.clear()
                        window.location.url = '/'
                        window.location.reload()

                    }
                }
                console.log('ee = ', e)
                return e
            })
    }
    // console.log(realScope, '-', url)
    try {
        return await fetch(url.replace('scope', process.env.REACT_APP_SERVICE_SCOPE), {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(instance)
        })
            .then((response) => response.json())
            .then(responseJson => {
                // console.log('responseJson = ', responseJson)
                // console.log(responseJson)
                if (responseJson?.status === 401) {
                    const query = new URLSearchParams(window.location.search);
                    const mobileToken = query.get('mobiletoken')
                    if (!mobileToken){
                        localStorage.clear()
                        window.location.url = '/'
                        window.location.reload()

                    }
                }
                // window.location.url = '/'

                return responseJson
            });
    } catch (err) {
        console.log('err =', err)

        if (err.status === 401) {
            const query = new URLSearchParams(window.location.search);
            const mobileToken = query.get('mobiletoken')
            if (!mobileToken){
                localStorage.clear()
                window.location.url = '/'
                window.location.reload()

            }

        }
        // console.log(err);
    }
};

export default fetchInstance;
