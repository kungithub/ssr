const fs = require('fs');
const path = require('path');

module.exports = {

    async list(ctx) {
        let { page = 1, size = 10 } = ctx.params;
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, './tmp.txt')));
        ctx.body = { list: data.slice((page - 1) * size, page * size), count: data.length };
    }

}