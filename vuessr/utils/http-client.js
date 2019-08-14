import axios from 'axios';

var http = axios.create({
    baseURL: 'http://localhost:8070'
})


export default http;