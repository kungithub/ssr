const config = require('./config');
const isDev = process.env.NODE_ENV === "development";


module.exports = async function (request, renderer) {
    if (isDev) return renderer.renderToString(request);
    const redis = require('redis').createClient(config.redis);
    const lru = require('redis-lru');
    const cache = lru(redis, 100);
    let out = await cache.get(request.url);
    if (!out) {
        out = await renderer.renderToString(request);
        await cache.set(request.url, out);
    }
    return out;

}