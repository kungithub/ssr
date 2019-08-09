const router = require('koa-router')();

router.get('/api/data', async (ctx) => {
    ctx.body = "首页";
})

module.exports = router;
