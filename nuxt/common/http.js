import axios from 'axios';




let out = axios;


axios.defaults.baseURL = 'http://localhost:3000';
// http request 拦截器
out.interceptors.request.use(
    config => {
    },
    err => {
    });

// http response 拦截器
out.interceptors.response.use(
    response => {
    },
    error => {

    });



export default {
    get(e) {
        console.log('process', process);
        if (process && process.server) {
            let path = require("path");
            let config = eval('require(path.join(process.cwd(), "server", "config.js"))');
            console.log('服务端发起请求')
            return { data: config.name + '这是服务端请求' };
        } else {
            console.log('客户端发起请求')
            debugger
            return out.get(e);
        }
    }
}