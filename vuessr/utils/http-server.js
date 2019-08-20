import axios from 'axios';

var http = axios.create({
    baseURL: 'http://localhost:8070'
})   // {}中放入上文中的配置项


export default {
    // server端重写header
    post(url, params, request) {
        if (!request && params) [request, params] = [params, request];
        // 如果已经是重定向过的，不做处理
        if (!request.headers["X-Forwarded-For"]) {
            request.headers["X-Forwarded-For"] = request.req.connection.remoteAddress;
            request.headers["X-real-ip"] = request.req.connection.remoteAddress;
        }
        return http.post(url, params, {
            headers: request.headers
        });
    },
    get: http.get
};