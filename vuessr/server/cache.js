const config = require('./config');
const redis = require('redis').createClient(config.redis);
const lru = require('redis-lru');
const cache = lru(redis, 100);
const isDev = process.env.NODE_ENV === "development";


module.exports = async function (url, renderer) {
    if (isDev) return renderer.renderToString({ url });
    let out = await cache.get(url);
    if (!out) {
        out = await renderer.renderToString({ url });
        await cache.set(url, out);
    }
    return out;

}