const router = require('koa-router')();
const news = require('./contoller/news');

module.exports = (app) => {

    router.post('/api/news/list/:page', news.list);

    app.use(router.routes());   /*启动路由*/
}


