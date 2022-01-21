// === Taschenrechner ===

function add(var1, var2) {
    return var1 + var2
}

function subtract(var1, var2) {
    return var1 - var2
}

function divide(var1, var2) {
    return var1 / var2
}

function multiply(var1, var2) {
    return var1 * var2
}

function square(var1) {
    return var1 * var1
}

// === Sleep ===

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

// === Timer ===

function getTime(startTime, stopTime) {
    let Time = 0
    let Hours = 0
    let Minutes = 0
    let Seconds = 0
    Time = stopTime - startTime
    Hours = Math.floor(Time / 3600000)
    Minutes = Math.floor((Time % 3600000) / 60000)
    Seconds = Math.floor((Time % 3600000) / 1000)
    console.log(`${Hours}h:${Minutes}m:${Seconds}s`)
    return
}

module.exports = { add, subtract, divide, multiply, square, getTime, sleep}