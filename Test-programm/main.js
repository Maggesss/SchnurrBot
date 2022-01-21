const bm = require("./functions/basic_maths.js");

async function test() {
    const x = bm.timerStartStop;
    await bm.sleep(3000);   
    const y = bm.timerStartStop;
    bm.getTime(x, y)
}