const Koa = require('koa');
const app = new Koa();
const path = require('path');
const staticServer = require('koa-static-server');
const dev = require('./dev.js');
require('./routers')(app);
const config = require('./config');
const cache = require('./cache');

// 解析器
let build = dev();
// 静态资源路径
const distPath = path.join(__dirname, '../dist');
// 静态资源
app.use(staticServer({ rootDir: distPath, rootPath: '/dist' }));

app.use(async (ctx, next) => {
    try {
        if (!build.renderer) {
            return ctx.body = "构筑中……";
        }
        let out = await cache(ctx.request, build.renderer);
        ctx.set('Content-Type', 'text/html; charset=utf-8');
        ctx.body = out;
    } catch (e) {
        console.error(e);
        let redirect = '/error';
        if (e.code === 404) redirect += '?code=404';
        ctx.redirect(redirect);
    }
});

app.listen(config.port, () => {
    console.log(`server ${config.port} listened!`);
});
