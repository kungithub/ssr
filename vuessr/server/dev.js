const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');
const isDev = process.env.NODE_ENV === "development";
// 模板
const template = require('fs').readFileSync(path.join(__dirname, '../template/server.template.html'), 'utf-8')


let serverBundle;
let clientManifest;

module.exports = function () {
    let build = {};
    if (!isDev
    ) {
        // ssr 编译好的路径
        serverBundle = require('../dist/vue-ssr-server-bundle.json')
        clientManifest = require('../dist/vue-ssr-client-manifest.json')

        renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false, // 推荐
            template,
            clientManifest
        });
        build.renderer = renderer;
    } else {
        const webpack = require('webpack')
        const MFS = require('memory-fs')
        const clientConfig = require('../config/client.config')
        const serverConfig = require('../config/server.config')

        const clientCompiler = webpack(clientConfig) // 执行webpack

        clientCompiler.watch({}, (err, stats) => {
            if (err) throw err
            stats = stats.toJson()
            stats.errors.forEach(err => console.error(err))
            stats.warnings.forEach(err => console.warn(err))
        });

        clientCompiler.plugin('done', () => {
            const clientBundlePath = path.join(serverConfig.output.path, 'vue-ssr-client-manifest.json')
            clientManifest = JSON.parse(fs.readFileSync(clientBundlePath, 'utf-8'))

            console.log('client update...')
            if (serverBundle) {
                renderer = createBundleRenderer(serverBundle, {
                    runInNewContext: false, // 推荐
                    template,
                    clientManifest
                });
                build.renderer = renderer;
            }
        })

        // 监听 server renderer
        const serverCompiler = webpack(serverConfig)
        const mfs = new MFS() // 内存文件系统，在JavaScript对象中保存数据。
        serverCompiler.outputFileSystem = mfs
        serverCompiler.watch({}, (err, stats) => {
            if (err) throw err
            stats = stats.toJson()
            stats.errors.forEach(err => console.error(err))
            stats.warnings.forEach(err => console.warn(err))

            // 读取使用vue-ssr-webpack-plugin生成的bundle（vue-ssr-bundle.json）
            const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
            serverBundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
            console.log('server update...')
            if (clientManifest) {
                renderer = createBundleRenderer(serverBundle, {
                    runInNewContext: false, // 推荐
                    template,
                    clientManifest
                });
                build.renderer = renderer;
            }
        })
    }
    return build;
}