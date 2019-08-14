import axios from 'axios';

var http = axios.create({
    baseURL: 'http://localhost:8070'
})   // {}中放入上文中的配置项


export default {
    // server端重写header
    post(url, params, request) {
        if (!request && params) [request, params] = [params, request];
        return http.post(url, params, {
            headers: request.headers
        });
    },
    get: http.get
};