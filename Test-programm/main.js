const bm = require("./functions/basic_maths.js");
const axios = require("axios")

async function test() {
    const x = Date.now();
    await bm.sleep(3000);   
    const y = Date.now();
    bm.getTime(x, y)
}

test()