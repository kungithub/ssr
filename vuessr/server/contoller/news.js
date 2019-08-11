const fs = require('fs');
const path = require('path');

module.exports = {

    async list(ctx) {
        let { page } = ctx.params;
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, './tmp.txt')));
        ctx.status = 200;
        ctx.body = data;
    }

}