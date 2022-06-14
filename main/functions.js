const fs = require("fs");
const path = require("path");
const Bothelper = require("./source/bothelper/index");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

function isHelper(id) {
    const helperObj = new Bothelper(JSON.parse(fs.readFileSync(path.resolve(`./data/bothelper/bothelper.json`))));
    if (helperObj.helper.includes(id)) {
        return true;
    } else { return false; };
};

function isInt(probe) {
    try {
        probe = parseInt(probe)
        return true
    } catch {
        return false
    }
}

module.exports = { getRandomIntInclusive, isHelper, isInt}