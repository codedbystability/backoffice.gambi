import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        const bearer = localStorage.getItem('bearer');
        config.headers.Authorization = `Bearer ${bearer}`;
        // config.headers['W-SECRET'] = `Xfx9zwPSLC1t2ltV`; // STIL.COM
        // config.headers['W-SECRET'] = `gXmqkthvbBjbcbHN`; // GAMBI.COM
        config.headers['W-SECRET'] = process.env.REACT_APP_WEBSITE_SECRET; // GAMBI.COM
        config.baseURL = "https://services.gambi.com/api/operator/";
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default {
    post: (url, body) => axios.post(url, body)
        .then(response => response.data)
        .catch(error => error.response?.data),

    get: (url) => axios.get(url)
        .then(response => response.data)
        .catch(error => error.response?.data),

    setHeader: (key, value) => axios.interceptors.request.use(
        function (config) {
            config.headers[key] = value;
            config.baseURL = "https://services.gambi.com/api/operator/";

            return config;
        }
    )
};
