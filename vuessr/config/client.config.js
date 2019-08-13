const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === "development";
const ExtractTextPlugin = require('extract-css-chunks-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')

module.exports = merge(baseConfig, {
    entry: './entry-client.js',
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: isDev ? ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] :
                    [ExtractTextPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        "runtimeChunk": "single",
        "minimize": false,
        "splitChunks":
        {
            "chunks": "all",
            "automaticNameDelimiter": ".",
            "cacheGroups": {
                "commons": {
                    "test": /node_modules[\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|@babel\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)[\\/]/,
                    "chunks": "all",
                    "priority": 10,
                    "name": true
                }
            }
        }
    },
    resolve: {
        alias: {
            $http: path.resolve(__dirname, '../utils/http-client.js')
        }
    }
})
