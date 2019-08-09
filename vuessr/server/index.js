const Koa = require('koa');
const app = new Koa();
const { createBundleRenderer } = require('vue-server-renderer');
const path = require('path');
const staticServer = require('koa-static-server');
const fs = require('fs');
const isDev = process.env.NODE_ENV === "development";

// 解析器
let renderer;
let serverBundle;
let clientManifest;

// 模板
const template = require('fs').readFileSync(path.join(__dirname, '../template/server.template.html'), 'utf-8')

if (!isDev
) {
    // ssr 编译好的路径
    serverBundle = require('../dist/vue-ssr-server-bundle.json')
    clientManifest = require('../dist/vue-ssr-client-manifest.json')

    renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false, // 推荐
        template,
        clientManifest
    })
} else {
    const webpack = require('webpack')
    const MFS = require('memory-fs')
    const clientConfig = require('../config/client.config')
    const serverConfig = require('../config/server.config')
    const devMiddleware = require("./devMiddleware");
    const hotMiddleware = require('./hotMiddleware');


    // // 修改客户端配置添加 热更新中间件
    // clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    // // clientConfig.output.filename = '[name].js'
    // clientConfig.plugins.push(
    //     new webpack.HotModuleReplacementPlugin(),
    //     new webpack.NoEmitOnErrorsPlugin()
    // )

    // DEV Middleware
    const clientCompiler = webpack(clientConfig) // 执行webpack

    // app.use(devMiddleware(clientCompiler))

    clientCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
    });

    clientCompiler.plugin('done', () => {
        const filePath = path.join(clientConfig.output.path, 'index.html') // 模板为打包后的html文件
        // if (fs.existsSync(filePath)) {
        // template = fs.readFileSync(filePath, 'utf-8')
        const clientBundlePath = path.join(serverConfig.output.path, 'vue-ssr-client-manifest.json')
        clientManifest = JSON.parse(fs.readFileSync(clientBundlePath, 'utf-8'))

        console.log('client update...')
        if (serverBundle) {
            renderer = createBundleRenderer(serverBundle, {
                runInNewContext: false, // 推荐
                template,
                clientManifest
            });
        }
        // }
    })

    // HOT Middleware
    // app.use(hotMiddleware(clientCompiler))

    // 监听 server renderer
    const serverCompiler = webpack(serverConfig)
    // const mfs = new MFS() // 内存文件系统，在JavaScript对象中保存数据。
    // serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))

        // 读取使用vue-ssr-webpack-plugin生成的bundle（vue-ssr-bundle.json）
        const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
        serverBundle = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'))
        console.log('server update...')
        renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false, // 推荐
            template,
            clientManifest
        });
    })
}

// 静态资源路径
const distPath = path.join(__dirname, '../dist');

// 静态资源
app.use(staticServer({ rootDir: distPath, rootPath: '/dist' }));


app.use(async (ctx, next) => {
    try {
        console.log(ctx.request.url);
        let str = await renderer.renderToString(
            {
                url: ctx.request.url,
                // title: 'hello world'
            });
        ctx.body = str;
        ctx.set('Content-Type', 'text/html; charset=utf-8')
    } catch (e) {
        console.error(e);
        ctx.body = "ERROR";
    }
});

app.listen(8080, () => {
    console.log('listen 8080');
});
