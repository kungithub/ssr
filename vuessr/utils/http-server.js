import axios from 'axios';

var http = axios.create({
    baseURL: 'http://localhost:8080'
})   // {}中放入上文中的配置项

// // http request 拦截器
// http.interceptors.request.use(
//     config => {
//     },
//     err => {
//     });

// // http response 拦截器
// http.interceptors.response.use(
//     response => {
//     },
//     error => {

//     });

export default http;